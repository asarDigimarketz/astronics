import { connectDb } from "@/utils/lib/connectDb";
import { writeFile } from "fs/promises";
import productModel from "@/utils/models/ProductModel";
import { NextResponse } from "next/server";
const fs = require("fs");

export async function GET() {
  try {
    await connectDb();
    const products = await productModel.find({});
    return Response.json(products, { success: true, status: 201 });
  } catch (err) {
    return Response.json({ error: err.message, success: false, status: 500 });
  }
}

export async function POST(req) {
  await connectDb();
  const formData = await req.formData();
  const timeStamp = Date.now();

  // Handle image upload
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageByteData);
  const imagePath = `./public/assets/img/products/${timeStamp}_${image.name}`;
  await writeFile(imagePath, imageBuffer);
  const imageUrl = `/assets/img/products/${timeStamp}_${image.name}`;

  // Handle PDF upload
  const pdf = formData.get("pdf");
  const pdfByteData = await pdf.arrayBuffer();
  const pdfBuffer = Buffer.from(pdfByteData);
  const pdfPath = `./public/assets/img/pdf/${timeStamp}_${pdf.name}`;
  await writeFile(pdfPath, pdfBuffer);
  const pdfUrl = `/assets/img/pdf/${timeStamp}_${pdf.name}`;

  // Create a new product with both image and PDF
  const newProduct = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    newCategory: formData.get("newCategory"),
    originalPrice: formData.get("originalPrice"),
    price: formData.get("price"),
    image: imageUrl,
    pdf: pdfUrl, // Store the PDF URL in the product model
  };

  await productModel.create(newProduct);

  return new Response(
    JSON.stringify({
      newProduct,
      success: true,
      status: 201,
      message: "Product with PDF added successfully",
    }),
    { status: 201 }
  );
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
        msg: "Product ID is required",
      });
    }
    const product = await productModel.findById(id);

    if (product) {
      const imagePath = `./public${product.image}`;
      const pdfPath = `./public${product.pdf}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image at ${imagePath}:`, err);
        }
      });
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error(`Failed to delete pdf at ${pdfPath}:`, err);
        }
      });
    } else {
      console.log(`product with id ${id} not found`);
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        status: 404,
        msg: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error); // Log the error for debugging
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
