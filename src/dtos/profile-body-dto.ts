import {
  IsDate, IsEmail, IsMobilePhone,
  IsNotEmpty, IsOptional, IsPostalCode, IsString,
  Length
} from "class-validator";

import { Type, Transform } from "class-transformer";

export class ProfileBodyDto {

  @IsNotEmpty({
    message: "User id should not be empty"
  })
  userId: string;

  @IsOptional()
  kycverified: boolean;

  @IsNotEmpty({
    message: "First name should not be empty"
  })
  firstname: string;

  @IsNotEmpty({
    message: "Last name should not be empty",
  })
  lastname: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  mobile: string;
  
  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsPostalCode('IN')
  pinCode: number;

  @IsString()
  gender: string;

  @IsDate()
  @Type(() => Date)
  @Transform(value => value.valueOf(), { toPlainOnly: true })
  dateOfBirth: Date;

  @IsOptional()
  secondaryEmail: string;

  @IsOptional()
  secondaryPhone: string;

  @IsNotEmpty()
  @Length(1, 3)
  bloodGroup: string;
  
  @IsOptional()
  language: string;

  @IsString()
  timeZone: Date;
}