import { API_HOST } from '../util/api';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { HasId } from './Sync';
import { Attributes } from './Attributes';

interface UserProps extends HasId {
  name?: string;
  age?: number;
}

class User {
  private sync: Sync<UserProps> = new Sync(`${API_HOST}/users`);
  public events: Eventing = new Eventing();
  public attributes: Attributes<UserProps>;

  constructor (attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
}

export default User;