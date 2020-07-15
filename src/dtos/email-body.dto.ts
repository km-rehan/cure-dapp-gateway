export interface EmailBodyDTO {
  activated: boolean,
  doctor: boolean,
  wallets: string[],
  walletCreationInProgress: boolean,
  isUserVerified: boolean,
  _id: string,
  walletAddress: string,
  createdAt: Date,
  updatedAt: Date,
}