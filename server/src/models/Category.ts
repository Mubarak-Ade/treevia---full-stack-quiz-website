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

CategorySchema.pre( 'findOneAndUpdate', function ( next )
{
    // Generate slug for category name
    const update = this.getUpdate() as any
    if ( update.name )
    {
        update.slug = slugify( update.name, {
            lowercase: true,
        } );
    }

    // Generate slugs for tags
    if ( update.tags )
    {
        update.tags = update.tags.map( ( tag: any ) => ( {
            name: tag.name,
            slug: slugify( tag.name, { lowercase: true } )
        } ) );

    }
    next();
} )


const Category = model<CategoryModel>( "Category", CategorySchema )

export default Category