export interface PersonalInfoReq {
  date_of_birth: string
  download_link_option: boolean
  gender: string
  gender_details: string
  phone_number: string
}

export interface PersonalInfoResp {
  verdict: string;
  message: string;
  data: any;
}
