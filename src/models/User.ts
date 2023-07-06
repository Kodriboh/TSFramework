import { API_HOST } from '../util/api';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { HasId } from './Sync';

interface UserProps extends HasId {
  name?: string;
  age?: number;
}

class User {
  private data: UserProps;
  private sync: Sync<UserProps> = new Sync(`${API_HOST}/users`);
  public events: Eventing = new Eventing();

  constructor(data: UserProps) {
    this.data = data;
  }

  public get(propName: string): (number | string) {
    return this.data[propName];
  }

  public set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}

export default User;