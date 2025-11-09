import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

/**
 * GET -> returns saved resume for the current session user (if any).
 * POST -> save resume; body: { userEmail, layout, resumeData }
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email") || "demo-user";

    const { db } = await connectToDatabase();
    const doc = await db.collection("resumes").findOne({ userEmail });
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err) {
    console.error("Resume GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userEmail = "demo-user", layout = "single", resumeData = {} } = body;

    const { db } = await connectToDatabase();
    const now = new Date();

    const update = {
      $set: {
        userEmail,
        layout,
        resumeData,
        updatedAt: now,
      },
    };

    await db.collection("resumes").updateOne({ userEmail }, update, { upsert: true });

    return NextResponse.json({ message: "Saved" });
  } catch (err) {
    console.error("Resume POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
