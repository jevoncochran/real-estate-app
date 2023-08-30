import db from "@/lib/db";
import Property from "@/models/Property";

export async function GET(req) {
  await db.connect();

  try {
    const properties = await Property.find({})
      .limit(16)
      .populate("currentOwner");

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
