import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
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

export async function PUT(req, ctx) {
  await db.connect();

  const id = ctx.params.id;
  const tokenHeader = req.headers.get("Authorization");
  const token = tokenHeader.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!tokenHeader || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized (Incorrect or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    console.log("body: ", body);

    const property = await Property.findById(id).populate("currentOwner");

    if (property.currentOwner._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: "Only owner can update property" }),
        { status: 403 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  const tokenHeader = req.headers.get("Authorization");
  const token = tokenHeader.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!tokenHeader || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized (Incorrect or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const property = await Property.findById(id).populate("currentOwner");

    if (property?.currentOwner._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({
          message: "Only owner can delete his or her property",
        }),
        { status: 403 }
      );
    }

    await Property.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Successfully deleted property" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
