import bcrypt from "bcrypt";

export async function validPassword(
  password: string,
  hashedPassword: string
): Promise<Boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function genPassword(password: String) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

export default { validPassword, genPassword };
