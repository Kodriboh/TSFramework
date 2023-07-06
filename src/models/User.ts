import axios, { AxiosResponse } from 'axios';
import { API_HOST } from '../util/api';
import { Eventing } from './Eventing';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

class User {
  private data: UserProps;
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

  public fetch() : void {
    axios.get(`${API_HOST}/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => this.set(res.data));
  }

  public save() : void {
    const id = this.get('id');
    if (id) {
      axios.put(`${API_HOST}/users/${id}`, this.data);
      return;
    }
    axios.post(`${API_HOST}/users`, this.data);
  }
}

export default User;