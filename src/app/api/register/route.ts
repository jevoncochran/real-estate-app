import db from "@/lib/db";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req) {
  try {
    await db.connect();

    const { username, email, password: pass } = await req.json();

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password, ...user } = newUser._doc;

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
