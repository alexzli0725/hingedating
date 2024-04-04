import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, settoken] = useState('');
  const [isLoading, setisLoading] = useState('');

  const isLoggedIn = async () => {
    try {
      setisLoading(true);
      const userToken = await AsyncStorage.getItem('token');
      settoken(userToken);
      setisLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoading, settoken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
