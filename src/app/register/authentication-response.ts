export interface AuthenticationResponse {
    [x: string]: any;
    accessToken?: string;
    mfaEnabled?: string;
    secretImageUri?: string;
    secret?:string;
  }