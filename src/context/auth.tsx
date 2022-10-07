import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import { COLLECTION_USER } from "../config/database";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserSchema {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: UserSchema;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  storedUserIsLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserSchema>({} as UserSchema);
  const [storedUserIsLoading, setStoredUserIsLoading] = useState<boolean>(true);

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      // get url below at https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#oauth-2.0-endpoints_1
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1&bold=true&background=ffffff`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUser({} as UserSchema);
    await AsyncStorage.removeItem(COLLECTION_USER);
  };

  useEffect(() => {
    const loadStoredUserData = async () => {
      const storedUserData = await AsyncStorage.getItem(COLLECTION_USER);

      if (storedUserData) {
        const userLogged = JSON.parse(storedUserData);
        setUser(userLogged);
      }
      setStoredUserIsLoading(false);
    };
    loadStoredUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        storedUserIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Context Hook
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
