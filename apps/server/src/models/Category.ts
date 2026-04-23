import slugify from "@sindresorhus/slugify";
import { InferSchemaType, model, Schema } from "mongoose";

const tagSchema = new Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        index: true,
        lowercase: true
    },

}, { _id: false } )

const CategorySchema = new Schema( {
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
        unique: true,
        index: true
    },
    tags: { type: [ tagSchema ], default: [] }
}, { timestamps: true } )

export type CategoryModel = InferSchemaType<typeof CategorySchema>


CategorySchema.pre( 'save', function ( next )
{
    // Generate slug for category name
    if ( this.isModified( 'name' ) || this.isNew )
    {
        this.slug = slugify( this.name, {
            lowercase: true,
        } );
    }

    // Generate slugs for tags
    if ( this.tags )
    {
        this.tags.forEach( tag =>
        {
            if ( !tag.slug && tag.name )
            {
                tag.slug = slugify( tag.name, { lowercase: true } );
            }
        } );
    }

    next();
} )

CategorySchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;

    // The actual fields could be at the top level OR nested under $set
    const fields = update.$set || update;

    // Generate slug for category name
    if (fields.name) {
        fields.slug = slugify(fields.name, { lowercase: true });
    }

    // Generate slugs for tags
    if (fields.tags) {
        fields.tags = fields.tags.map((tag: any) => ({
            name: tag.name,
            slug: slugify(tag.name, { lowercase: true }),
        }));
    }

    next();
});

CategorySchema.virtual("quizCount", {
    ref: "Quiz",
    localField: "_id",
    foreignField: "category",
    count: true
})

const Category = model<CategoryModel>( "Category", CategorySchema )

export default Category