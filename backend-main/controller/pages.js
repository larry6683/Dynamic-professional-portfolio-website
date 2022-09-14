const Pages = require('../models/pages');
const pageList = require('../models/pagelist')

const slugify = require('slugify');



exports.create = (req, res) => {
    const userdata = req.body.data
    const name = userdata.pagename
    const slug = slugify(name).toLowerCase()
    const data = JSON.parse(userdata.pagedata)
    const pages = new Pages()
    pages.name = name
    pages.slug = slug
    pages.pagedata = data
    pages.mdesc= userdata.mdesc
    


    const pagelistdata = new pageList();
    pagelistdata.name = name
    pagelistdata.slug = slug


    pages.save(function (err) {

        console.log(err)
        if (!err) {

            pagelistdata.save(function (err) {
                if (!err) {
                    return res.status(200).json({
                        msg: 'Page Created',
                        status: 200
                    });

                }
            })

        }
        else {
            return res.status(500).json({
                msg: err,
                status: 500
            });
        }
    })
}
exports.getpage = (req, res) => {
    console.log(req.body.pagename)
    const slug = req.body.pagename.toLowerCase()
    Pages.findOne({ slug }).exec((err, result) => {
        console.log(err)

        return res.status(200).json({
            msg: "success",
            data: result,
            status: 200
        })


    })

}

exports.deletepage=(req,res)=>{

    const id = req.body.id
    const slug = req.body.slug
    console.log(req.body)

    console.log(id)

    Pages.findOneAndDelete({slug},function(err){
        console.log(err)
        if (err){
            return res.status(500).json({
                msg:"something went wrong"
            })
        }
        else{
        
            pageList.findOneAndDelete({slug},function(err){

                if (err){
                    return res.status(500).json({
                        msg:"something went wrong"
                    })
                }
                else{
                    return res.status(200).json({
                        msg:"Deleted sucessfully"
                    })
                }

            })
           
        }

    })

}

exports.update= (req, res) => {
    const userdata = req.body.data
    const id= userdata.id

    const data = JSON.parse(userdata.pagedata)



    Pages.findByIdAndUpdate({_id:id},{pagedata:data},function(err,result){
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
    })


}