import { IsNotEmpty } from "class-validator";

export class VerifyMessageDTO {

  @IsNotEmpty()
  tokenId: string;

  @IsNotEmpty()
  signature: string;

  @IsNotEmpty()
  walletAddress: string;

}