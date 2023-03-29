import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types/user';
import handleLogin from '@/helpers/handleLogin';
import useAccessToken from './useAccessToken';

type UseUser = {
  user?: User,
  isLoading: boolean,
  isError: boolean
};

export default function useUser(): UseUser {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const accessToken = useAccessToken();
  const router = useRouter();

  const handleAsyncLogin = async (token: string) => {
    try {
      const data = await handleLogin(token);
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (accessToken !== undefined) handleAsyncLogin(accessToken);
  }, [router, accessToken]);

  return {
    user: userData,
    isLoading,
    isError,
  };
}
