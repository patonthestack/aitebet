import { useEffect, useState } from 'react';
import { useAuth } from 'lib/auth';
import { useRouter } from 'next/router';
import { useDocument } from '@nandorojo/swr-firestore';

export function useAuthUser(redirectUrl = '/auth/sign-in') {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const auth = useAuth();
  const { user, signout } = auth;
  const router = useRouter();
  const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5)).toISOString();

  // Get User Data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    update,
  } = useDocument<any>(`users/${user?.uid}`, {
    listen: false,
  });

  const updateUser = async (user: Partial<any>) => {
    try {
      await update({ ...user });
    } catch (e) {}
  };

  useEffect(() => {
    if (user === false) {
      router.push(redirectUrl);
    }
  }, [user]);

  useEffect(() => {
    if (fiveMinuteAgo < userData?.modifiedAt) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [userData, fiveMinuteAgo]);

  return {
    user,
    auth,
    userData,
    signout,
    userLoading,
    userError,
    updateUser,
    isOnline,
  };
}
