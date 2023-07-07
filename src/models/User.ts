import { API_HOST } from '../util/api';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { HasId } from './Sync';
import { Attributes } from './Attributes';
import { Callback } from './Eventing';

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

  public set(data: UserProps): void {
    this.attributes.set(data);
    this.events.trigger('change');
  }

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }
}

export default User;