import { Schema, models, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Contact = models.contactModel || model("contactModel", contactSchema);

export default Contact;
