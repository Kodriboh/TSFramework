import { Callback } from "./Eventing";
import { AxiosPromise, AxiosResponse } from "axios";
import { HasId } from './ApiSync';

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface ModelAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
}

export class Model<T extends HasId> {
  private attributes: ModelAttributes<T>;
  private events: Events;
  private sync: Sync<T>;

  constructor(attributes: ModelAttributes<T>, events: Events, sync: Sync<T>) {
    this.attributes = attributes;
    this.events = events;
    this.sync = sync;
  }

  public set(data: T): void {
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