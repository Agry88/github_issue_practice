import React, { createContext, useMemo } from 'react';
import { User } from '@/types/user';
import useUser from '@/hooks/useUser';

export type UserProvierValue = {
  user?: User
  isLoading: boolean
  isLogin: boolean
  isError: boolean
};

const inistialState: UserProvierValue = {
  isLoading: true,
  isLogin: false,
  isError: false,
};
export const UserContext = createContext<UserProvierValue>({ ...inistialState });

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUser();

  const value: UserProvierValue = useMemo(() => ({
    isLoading,
    isError,
    isLogin: true,
    ...user,
  }), [user, isLoading, isError]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
