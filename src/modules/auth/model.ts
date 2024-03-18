import { User } from 'src/schemas/User';

export class AuthModel extends User {
  isRegistry: boolean;
  type: 'group' | 'user';
}
