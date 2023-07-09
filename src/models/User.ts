import { Model } from './Model';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

class User extends Model<UserProps>  {

}

export default User;