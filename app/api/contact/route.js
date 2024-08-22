import { connectDb } from "@/utils/lib/connectDb";
import Contact from "@/utils/models/contactModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const contacts = await Contact.find({});
    return NextResponse.json(contacts, { success: true, status: 201 });
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
    await connectDb();

    const formData = await req.formData();

    // Extract form data and trim whitespace
    const name = formData.get("name")?.toString().trim();
    const company = formData.get("company")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validation
    if (!name) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Name is required",
      });
    }

    if (!company) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Company is required",
      });
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "A valid email address is required",
      });
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "A valid phone number is required",
      });
    }

    if (!message) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Message is required",
      });
    }

    const contactDetails = { name, company, email, phone, message };

    await Contact.create(contactDetails);
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
        msg: "ID is required",
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json({
        success: false,
        status: 404,
        msg: "Contact not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      msg: "Customer deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

// Helper function to validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate phone number (example format)
const validatePhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};
