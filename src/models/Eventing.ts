type Callback = () => void;

interface Event {
  [key: string]: Callback[];
}

export class Eventing {
  private events: Event = {};

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