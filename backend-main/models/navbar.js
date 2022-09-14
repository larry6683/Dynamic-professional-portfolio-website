const mongoose = require('mongoose');

const navbar = new mongoose.Schema(
    {
        fixed: {
            type:Array
        },
        dropdown: {
            type: Array,

        },
      
    },
    { timestamp: true }
);

module.exports = mongoose.model('navbar', navbar);