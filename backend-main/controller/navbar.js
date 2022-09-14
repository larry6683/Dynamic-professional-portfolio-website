const Pages = require('../models/pages');
const navbar = require('../models/navbar')

const slugify = require('slugify');



exports.create = (req, res) => {


    console.log(req.body)

    const fixed= req.body.fixed
    const dropdown = req.body.dropdown

     const Navbar = new navbar()

     Navbar.fixed = fixed
     Navbar.dropdown = dropdown

     Navbar.save(function(err){
         if(!err)
         {
             return res.status(200).json({
                 msg:"navbar created"
             })
         }
     })





}

exports.getnavbar=(req,res)=>{


navbar.find({}).exec((err,result)=>{
    if(result)
    {
        return res.status(200).json({
            msg:'success',
            result:result
        })
    }
})
}

exports.update = (req,res)=>{
    


    const id = req.body.id

    const fixed= req.body.fixed
    const dropdown = req.body.dropdown


navbar.findByIdAndUpdate({_id:id}, { fixed: fixed,dropdown:dropdown},
                            function (err, docs) {
    if (err){
        return res.status(500).json({
            msg:"something went wrong"
        })
    }
    else{
        return res.status(200).json({
            msg:"updated sucessfully"
        })
    }
});
}