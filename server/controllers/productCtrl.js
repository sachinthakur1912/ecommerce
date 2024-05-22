const Products = require('../models/productModel')

// filtering ,sorting ,pagination
class APIfeatures{
    constructor(query,queryString){
        this.query=query
        this.queryString=queryString
    }
    filtering(){
        const queryObj = {...this.queryString}
        // console.log(queryObj)
        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$' +match)
        // console.log({queryObj,queryStr})

        this.query.find(JSON.parse(queryStr))

        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
            return this
        }else{
            this.query =this.query.sort('createdAt')
        }
        return this

    }
    pagination(){
        const page = this.queryString.page*1 || 1;
        const limit = this.queryString.limit*1 || 9;
        const skip = (page-1)*limit;
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productCtrl ={
    getProducts:async(req,res)=>{
        try{
            // console.log(req.query)
            const features = new APIfeatures(Products.find(),req.query).filtering().sorting().pagination()
            const products = await features.query
            res.json({result:products.length})
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