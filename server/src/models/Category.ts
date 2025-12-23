import { InferSchemaType, model, Schema } from "mongoose";

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },

}, { _id: false })

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    tags: [tagSchema]
}, { timestamps: true })

type Category = InferSchemaType<typeof CategorySchema>

const Category = model<Category>("Category", CategorySchema)

export default Category