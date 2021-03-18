import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import firebase from './firebase';
const firestore = firebase.firestore();
import { createUser, updateUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('aitebet-auth', true, {
        expires: 1,
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove('aitebet-auth');

      setLoading(false);
      return false;
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .then((data) => {
        handleUser(data.user);
        Router.push('/dashboard');
      });
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        handleUser(data.user);
        Router.push('/dashboard');
      });
  };

  const forgotPassword = (email) => {
    setLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        Router.push('/auth/sign-in');
      })
      .catch((error) => {
        // An error happened.
        console.log('error', error);
      });
  };

  const changePassword = (newPassword) => {
    setLoading(true);
    const signedInUser = firebase.auth().currentUser;

    return signedInUser.updatePassword(newPassword).then((data) => {
      if (data) {
        handleUser(data.user);
        Router.push('/dashboard');
      }
    });
  };

  const signout = () => {
    Router.push('/');

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signinWithEmail,
    forgotPassword,
    changePassword,
    signout,
  };
}

const formatUser = async (user) => {
  const idTokenResult = await user.getIdTokenResult();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: idTokenResult.token,
    provider: user.providerData[0].providerId,
    modifiedAt: new Date().toISOString(),
  };
};
