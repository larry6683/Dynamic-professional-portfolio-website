const mongoose = require('mongoose');

const Pages = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },

        pagedata: {
            type: Array,
            required: true,
        },
        mdesc:{
            type:String
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('pages', Pages);