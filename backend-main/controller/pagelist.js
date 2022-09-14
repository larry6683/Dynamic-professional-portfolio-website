const pages = require('../models/pagelist');

const slugify = require('slugify');

exports.getpagelist = (req, res) => {

    pages.find({ }).exec((err, result) => {

        return res.status(200).json({
            msg: "success",
            data: result,
            status: 200
        })


    })

}