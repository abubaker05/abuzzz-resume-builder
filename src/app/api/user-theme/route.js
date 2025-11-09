import { connectToDatabase } from "@/lib/db-utils";

export async function POST(req) {
  try {
    const { email, themeId } = await req.json();
    if (!email || !themeId) {
      return Response.json({ message: "Missing data" }, { status: 400 });
    }

    const { usersCollection } = await connectToDatabase();

    await usersCollection.updateOne(
      { email },
      { $set: { theme: themeId, updatedAt: new Date() } },
      { upsert: true }
    );

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Theme save error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
