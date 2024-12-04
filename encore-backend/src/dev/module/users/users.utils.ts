import bcrypt from 'bcrypt';


// Secure password hashing using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12; // Higher rounds increase security but take more time
  return await bcrypt.hash(password, saltRounds); // bcrypt automatically generates salt and hashes the password
}

// Password verification using bcrypt
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  return await bcrypt.compare(password, storedHash); // bcrypt automatically handles salt and hash comparison
}



