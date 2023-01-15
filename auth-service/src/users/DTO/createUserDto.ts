import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  ValidateNested,
  IsLowercase,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Address {
  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly postalCode: string;

  @IsNotEmpty()
  readonly address: string;
}
export class CreateUserDto {
  //name
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly name: string;

  //firstName
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly firstName: string;

  //username
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly username: string;

  //email
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  //password
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;

  //fullAddress
  @IsNotEmpty()
  @Type(() => Address)
  @ValidateNested()
  readonly fullAddress: Address;

  //phoneNumber
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  readonly phoneNumber: string;
}
