import { NextResponse } from "next/server";
import { hashPassword, getUserByEmail } from "@/lib/db-utils";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    await db.collection("users").insertOne({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
