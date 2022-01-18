export interface TermAgreementReq {
  term_accepted: boolean
}

export interface TermAgreementResp {
  verdict: string;
  message: string;
  data: any;
}
