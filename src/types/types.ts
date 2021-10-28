export type AuthContextData = {
  signWithGoogle(): Promise<boolean>;
  user: User | null;
}

export type User = {
  id: string,
  name: string | null,
  avatar: string | null
}