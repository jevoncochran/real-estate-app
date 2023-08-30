import db from "@/lib/db";
import Property from "@/models/Property";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const property = await Property.findById(id)
      .populate("currentOwner")
      .select("-password");
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
