export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not defined.");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}
