import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  return (
    <AuthContext.Provider
      value={{
        googleLogin: async () => {
          try {
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });

            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

            // clear any previous error if login succeeds
            setError('');
          } catch (e) {
            // Filter out expected non-error situations
            if (e.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled, do nothing
              return;
            }
            if (e.code === statusCodes.IN_PROGRESS) {
              // sign-in already happening
              return;
            }
            if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // can't fix here, but maybe guide user to update
              return;
            }

            console.log('Google Sign-In Error:', e);
            setError(e.message || 'Login failed');
          }
        },

        appleLogin: async () => {
          try {
            // Request Apple Sign-In
            const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [
                appleAuth.Scope.FULL_NAME,
                appleAuth.Scope.EMAIL,
              ],
            });

            // Ensure Apple returned an identity token
            if (!appleAuthRequestResponse.identityToken) {
              throw new Error(
                'Apple Sign-In failed - no identity token returned',
              );
            }

            const {identityToken, nonce} = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(
              identityToken,
              nonce,
            );

            // Sign in with Firebase
            await auth().signInWithCredential(appleCredential);
          } catch (e) {
            setError(e.message);
          }
        },

        logout: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
          } catch (e) {
            setError(e.message);
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
