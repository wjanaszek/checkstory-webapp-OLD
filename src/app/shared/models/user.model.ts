export class User {
  id: number;
  login: string;
  email: string;
  password: string;
  token: string;

  constructor(login: string, email: string, password: string, token?: string) {
    this.login = login;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
