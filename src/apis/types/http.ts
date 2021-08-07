export enum Code {
  "wrong-email" = 1000,
}
export interface HttpRes {
  success: boolean;
  code: Code;
  message: string;
  data: any;
}
