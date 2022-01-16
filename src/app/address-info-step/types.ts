export interface AddressInfoReq {
  address: {
    address1: string;
    address2: string;
    city  : string;
    state_code: string,
    zip: string;
  }
  service_area_code: string
}

export interface AddressInfoResp {}
