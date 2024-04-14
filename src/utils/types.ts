export interface UserI {
  id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryI {
  id: number;
  name: string;
  checked: boolean;
}
