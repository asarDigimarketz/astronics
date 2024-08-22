import { connectDb } from "@/utils/lib/connectDb";
import productModel from "@/utils/models/ProductModel";

export async function GET(req, { params }) {
  try {
    await connectDb();
    const category = params.category;
    const products = await productModel.find({ category: category });
    return Response.json(products, { success: true, status: 201 });
  } catch (err) {
    return Response.json({ error: err.message, success: false, status: 500 });
  }
}
