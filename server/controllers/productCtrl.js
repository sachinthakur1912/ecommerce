const Products = require('../models/productModel')

const productCtrl ={
    getProducts:async(req,res)=>{
        try{
            const products = await Products.find()
            res.json(products)
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    },
    createProducts:async(req,res)=>{
        try{
            const {product_id,title,description,content,images,category} = req.body

            if(!images) return res.status(400).json({msg:"No image upload"})

            const product = await Products.findOne({product_id})

            if(product) return res.status(400).json({msg:"This product already exists"})

            const newProduct = await Products.create({
                product_id,title:title.toLowerCase(),description,content,images,category
            })
            res.json({
                msg:"Product created"
            })
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    },
    deleteProduct:async(req,res)=>{
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.json({
                msg:"Deleted a post"
            })
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const {title,description,content,images,category} = req.body
            // if(!images) return res.status(400).json({msg:"No image upload"})
            await Products.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),description,content,images,category
            })
            res.json({msg:"Updated"})
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}

module.exports = productCtrl