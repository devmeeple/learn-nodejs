export class User {
  userId: string | null;
  password: string | null;
  name: string | null;
  email: string | null;

  constructor(userId: string | null, password: string | null, name: string | null, email: string | null) {
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}