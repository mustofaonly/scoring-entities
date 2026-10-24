export interface PasswordHasher {
  hashPassword(password: string): Promise<string>;
  matchPassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface TokenGenerator<TEntity> {
  generateToken(payload: TEntity): Promise<string>;
  verifyToken(token: string): Promise<TEntity>;
}
