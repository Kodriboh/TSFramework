import { API_HOST } from '../util/api';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { HasId } from './Sync';
import { Attributes } from './Attributes';
import { Callback } from './Eventing';
import { AxiosResponse } from 'axios';

interface UserProps extends HasId {
  name?: string;
  age?: number;
}

class User {
  private sync: Sync<UserProps> = new Sync(`${API_HOST}/users`);
  private events: Eventing = new Eventing();
  private attributes: Attributes<UserProps>;

  constructor (attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  public set(data: UserProps): void {
    this.attributes.set(data);
    this.events.trigger('change');
  }

  public fetch(): void {
    const id = this.attributes.get('id');

    if (!id) {
      throw new Error('Cannot fetch without id');
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  public save(): void {
    this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse) =>
        this.trigger('save'))
      .catch(err =>
        this.trigger('error'));
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