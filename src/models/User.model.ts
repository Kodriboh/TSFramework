interface UserProps {
  name?: string;
  age?: number;
}

interface Event {
  [key: string]: Callback[];
}

type Callback = () => void;

class User {
  private data: UserProps;
  private events: Event = {};

  constructor(data: UserProps) {
    this.data = data;
  }

  public get(propName: string): (number | string) {
    return this.data[propName];
  }

  public set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  public on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
    console.log({ events: this.events });
  }

  public trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => callback());
  }
}

export default User;