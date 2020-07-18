import {Company} from './company';

export interface User {
  id: number;
  fullName: string;
  phoneNumber: string;
  company: Company;
}

export interface UserFilter {
  fullName?: string;
  phoneNumber?: string;
}

export interface UserAdding {
  fullName: string;
  phoneNumber: string;
  companyId: number;
}

export interface UserCredentials {
  phoneNumber: string;
  password: string;
}

export interface UserWithToken extends User {
  token: string;
}
