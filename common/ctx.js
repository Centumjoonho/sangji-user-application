import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext();

export function useSession(){
    const value = React.useContext(AuthContext);
    
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
          throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props){
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
          value={{
            signIn: (token) => {
              console.log('signin: =>' + token);
              // Perform sign-in logic here
              setSession('xxx');
            },
            signOut: () => {
              setSession(null);
            },
            session,
            isLoading,
          }}>
          {props.children}
        </AuthContext.Provider>
      );
}