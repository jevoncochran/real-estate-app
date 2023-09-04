import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
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

export async function POST(req) {
  await db.connect();

  const tokenHeader = req.headers.get("Authorization");
  const token = tokenHeader.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!tokenHeader || !decodedToken) {
    return new Response(JSON.stringify({ error: "Unauthorized Request" }), {
      status: 500,
    });
  }

  try {
    const body = await req.json();

    const newProperty = await Property.create(body);

    return new Response(JSON.stringify(newProperty), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
