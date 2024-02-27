import { UUID } from "crypto";

export interface UserEntity {
  user_id:UUID;
  name:string; 
  lastname:string; 
  email:string; 
  password:string; 
  address:string; 
  type:UserType;
}

export enum UserType {
  ADMIN = 'ECOMMERCE',
  CLIENT = 'CLIENT'
}

