interface UserProps {
  name: string;
  age: number;
}

class User {
  private data: UserProps;
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