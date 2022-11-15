export class BaseProfileDto {
  wallet: string;
  username: string;
  email: string;
  telegram: string;
}

export class UpdateProfileDto extends BaseProfileDto {
  signatureHash: string;
}
