import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

// Interface cho token đã giải mã
interface DecodedToken {
  exp: number;
  username: string; // Thêm thông tin username từ token
  [key: string]: any;
}

// Interface cho AuthContext, bổ sung username
interface AuthContextType {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
  username: string | null;
  setUsername: (value: string) => void;
}

// Module mở rộng cho jwt-decode
declare module 'jwt-decode' {
  export default function jwt_decode<T>(token: string | null): T;
}

// Tạo AuthContext với giá trị mặc định là undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider để cung cấp ngữ cảnh xác thực
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const decodedToken: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        // Lưu thông tin username từ token
        setUsername(decodedToken.username);

        setIsLoggedIn(decodedToken.exp > currentTime);
      } catch (error) {
        console.error('Error in checkToken:', error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
