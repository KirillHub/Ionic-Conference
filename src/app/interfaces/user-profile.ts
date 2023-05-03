interface Location {
  street?: {
    number: number;
    name: string;
  };
  city?: string;
  state: string;
  country: string;
}

interface Picture {
  large: string;
}

export interface UserResult {
  id: number;
  gender: string;
  name: string;
  email: string;
  phone: string;
  picture: Picture;
  description?: string;
  location: Location;
  isOpenMoreUserInfo?: boolean;
}


export interface UserData {
  results: UserResult[];
}

