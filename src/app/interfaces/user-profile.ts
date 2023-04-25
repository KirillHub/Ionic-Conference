export interface UserProfile {
  location: string;
  gender: string;
  name: string;
  email: string;
  phone: string;
}

interface Picture { // no implement (only large)
  large: string;
  medium: string;
  thumbnail: string;
}

export interface UserResult {
  gender: string;
  name: string;
  email: string;
  phone: string;
  picture: {
    large: string
  };
}

export interface UserData {
  results: UserResult[];
}
