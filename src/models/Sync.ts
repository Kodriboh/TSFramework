import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { API_HOST } from '../util/api';

export interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  private routeUrl: string;

  constructor(routeUrl: string) {
    this.routeUrl = routeUrl;
  }

  public fetch(id: number) : AxiosPromise {
    return axios.get(`${this.routeUrl}/${id}`);
  }

  public save(data: T) : AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.routeUrl}/${id}`, data);
    }
    return axios.post(`${API_HOST}/users`, data);
  }
}