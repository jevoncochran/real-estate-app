import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Property from "@/models/Property";

export async function POST(req) {
  await db.connect();

  const tokenString = req.headers.get("Authorization");
  const token = tokenString.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!tokenString || !decodedToken) {
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
