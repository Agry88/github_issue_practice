import Config from '@/config';
import { User } from '@/types/user';

export default async function handleLogin(acessToken: string): Promise<User> {
  const response = await fetch(`${Config.hostURL}/api/oauth/signin?access_token=${acessToken}`);
  const user: User = await response.json();
  return user;
}
