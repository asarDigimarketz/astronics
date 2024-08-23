import { connectDb } from "@/utils/lib/connectDb";
import { writeFile } from "fs/promises";
import bannerModel from "@/utils/models/carouselBannerSchema";
const fs = require("fs");
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const banners = await bannerModel.find({});
    return Response.json(banners, { success: true, status: 201 });
  } catch (err) {
    return Response.json({ error: err.message, success: false, status: 500 });
  }
}

export async function POST(req) {
  await connectDb();
  const formData = await req.formData();
  const timeStamp = Date.now();
  const image = formData.get("image");

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./assets/img/bannercarousel/${timeStamp}_${image.name}`;

  await writeFile(path, buffer);
  const imageUrl = `/assets/img/bannercarousel/${timeStamp}_${image.name}`;

  const newBanner = {
    bannerTitle: `${formData.get("bannerTitle")}`,
    bannerDescription: `${formData.get("bannerDescription")}`,
    image: `${imageUrl}`,
  };
  await bannerModel.create(newBanner);
  return Response.json({
    newBanner,
    success: true,
    statu: 201,
    message: "Banner added successfully",
  });
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
        msg: "banner ID is required",
      });
    }
    const banner = await bannerModel.findById(id);

    if (banner) {
      const imagePath = `./public${banner.image}`;

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image at ${imagePath}:`, err);
        }
      });
    } else {
      console.log(`Banner with id ${id} not found`);
    }

    const deletedbanner = await bannerModel.findByIdAndDelete(id);

    if (!deletedbanner) {
      return NextResponse.json({
        success: false,
        status: 404,
        msg: "banner not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      msg: "banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banner:", error); // Log the error for debugging
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
