import mongoose from "mongoose"
const menuSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },


        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
)

const Menu = mongoose.model('Product', menuSchema)

export default Menu