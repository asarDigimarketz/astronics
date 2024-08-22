import User from "@/utils/models/userModel";
import { connectDb } from "@/utils/lib/connectDb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const users = await User.find({});
    return NextResponse.json(users, { success: true, status: 201 });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    connectDb();

    const formData = await req.formData();
    const loginDetails = {
      name: `${formData.get("name")}`,
      email: `${formData.get("email")}`,
      password: `${formData.get("password")}`,
    };

    if (!loginDetails.email || !loginDetails.password) {
      return NextResponse.json(
        {
          success: false,
          msg: "A valid email address and password are required",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(loginDetails.password, 10);

    // Save the user with the hashed password
    await User.create({
      ...loginDetails,
      password: hashedPassword,
    });

    console.log("Data saved");
    return NextResponse.json({ success: true, status: 201, msg: "Data added" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
export async function DELETE(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "User ID is required",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        status: 404,
        msg: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      msg: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting User:", error); // Log the error for debugging
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
