import type { User } from '../types';
export default function createGuest() {
  const guestUser: User = {
    username: `Guest${Math.floor(Math.random() * 9000 + 1000)}`,
    wins: 0,
    losses: 0,
  };

  return guestUser;
}
