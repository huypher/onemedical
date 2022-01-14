export interface LoginInfoReq {
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string,
  password: string;
}

export interface LoginInfoResp {
  data: any;
  token: string;
}
