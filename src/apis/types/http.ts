export enum Code {
  "wrong email" = 1000,
  "email exists" = 1001,
}
export interface HttpRes {
  success: boolean;
  code: Code;
  message: string;
  data: any;
}
