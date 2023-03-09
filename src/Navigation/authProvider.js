import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState('');

  return (
    <AuthContext.Provider
      value={{
        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            setError(e);
          }
        },
        logout: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
          } catch (e) {
            setError(e);
          }
        },
        user,
        setUser,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
