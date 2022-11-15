export class BaseProfileDto {
  profileId: number;
  name: string;
  description: string;
  price: number;
  downloadLink: string;
  featured: boolean;
  oneTime: boolean;
}

export class UpdateProfileDto extends BaseProfileDto {
  signatureHash: string;
}
