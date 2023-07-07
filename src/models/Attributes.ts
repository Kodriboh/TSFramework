export class Attributes <T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  public set(update: T): void {
    Object.assign(this.data, update);
  }
}