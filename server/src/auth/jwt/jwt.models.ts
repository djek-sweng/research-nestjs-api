export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface JwtUser {
  id: number;
  email: string;
}
