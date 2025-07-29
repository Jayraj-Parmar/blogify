import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    coverImageUrl: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const blog = model("blog", blogSchema);

export default blog;
