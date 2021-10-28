import React, { createContext, useState, useEffect } from 'react';
import { AuthContextData, User } from '../types/types';

import { auth, firebase } from '../services/firebase';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL)
          throw new Error('Missing information from Google Account.');

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signWithGoogle(): Promise<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise(async (resolve) => {
      auth.signInWithPopup(provider).then(result => {
        if (result.user) {
          const { displayName, photoURL, uid } = result.user;

          if(!displayName || !photoURL)
            throw new Error('Missing information from Google Account.');

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
          resolve(true);
        }
        else {
          setUser(null);
          resolve(false);
        }
      });
    })
  }

  return (
    <AuthContext.Provider value={{ signWithGoogle, user }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContext;