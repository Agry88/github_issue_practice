import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types/user';
import handleLogin from '@/helpers/handleLogin';

type UseUser = {
  user?: User,
  isLoading: boolean,
  isError: boolean
};

export default function useUser(): UseUser {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const formattedAcessToken = localStorage.getItem('accessToken') ?? '';

  useEffect(() => {
    if (formattedAcessToken === '') {
      router.push('/');
    }
    const handleAsyncLogin = async () => {
      try {
        const data = await handleLogin(formattedAcessToken);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    handleAsyncLogin();
  }, [formattedAcessToken, router]);

  return {
    user: userData,
    isLoading,
    isError,
  };
}
