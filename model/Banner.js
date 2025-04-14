
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    btnText: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending",
    },
});

export const HomeSliders = mongoose.model("banner", bannerSchema);
