import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function getUserByEmail(email) {
  const { db } = await connectToDatabase();
  return db.collection("users").findOne({ email });
}
