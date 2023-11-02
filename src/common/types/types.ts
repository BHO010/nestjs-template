
export type RefreshDecoded = {
  firstName: string
  lastName: string
  email: string
  iat: number
  exp: number
  refreshToken: string
}

export type JwtAccessPayload = {
	iat?: number;

	exp?: number;

	firstName: string;

	lastName: string;
	
	email: string;

  photo: string
};
