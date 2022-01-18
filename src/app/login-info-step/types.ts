export interface LoginInfoReq {
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string,
  password: string;
}

export interface LoginInfoResp {
  verdict: string;
  message: string;
  data: {
    token: string;
  };
}
