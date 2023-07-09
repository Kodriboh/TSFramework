import axios, { AxiosPromise } from 'axios';
import { API_HOST } from '../util/api';

export interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  private rootUrl: string;

  constructor(rootUrl: string) {
    this.rootUrl = rootUrl;
  }

  public fetch(id: number) : AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  public save(data: T) : AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${API_HOST}${this.rootUrl}/${id}`, data);
    }
    return axios.post(`${API_HOST}${this.rootUrl}`, data);
  }
}