import React, { useState, createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const signInWithGoogle = async () => {
    try {
      // get info at https://console.cloud.google.com/apis/credentials/oauthclient/
      const CLIENT_ID =
        "312962930511-vpkqemtntnetir01uf3dtdrsufh3j5e8.apps.googleusercontent.com";
      const REDIRECT_URI =
        "https://auth.expo.io/@thiagocabralcorreia/gofinances";
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
        console.log({ userLogged });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
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
