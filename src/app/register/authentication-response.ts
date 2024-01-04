export interface AuthenticationResponse {
    accessToken?: string;
    mfaEnabled?: string;
    secretImageUri?: string;
    secret?:string;
  }