import { Schema, model, models } from "mongoose";

const bannerSchema = new Schema(
  {
    bannerTitle: {
      type: String,
    },
    bannerDescription: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bannerModel =
  models.bannerCarousel || model("bannerCarousel", bannerSchema);
export default bannerModel;
