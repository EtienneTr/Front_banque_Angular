export class User {
  firstname: string;
  lastname: string;
  username: string;
  mail: string;
  password:string;
  token: string;
  accounts: {
    _id: string,
    type: string,
    balance: number,
  }
}
