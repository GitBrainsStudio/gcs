import { Profile } from 'src/app/modules/profile/models/profile.model';

export interface AuthenticationInfo {
  Token: string;
  Profile: Profile;
}
