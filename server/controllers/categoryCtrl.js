const Category = require('../models/categoryModel')
const categoryCtrl = {
    getCategories: async (req,res)=>{
        try{
            const categories = await Category.find()
            // console.log(categories)
            res.json(categories)
        }catch(error){
            res.status(500).json({msg:error.message})
        }
    },
    createCategory:async (req,res)=>{
        try{
            const {name}=req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"Category already present"})
            const newCategory = await Category.create({name})
            res.json({msg:"Category created"})
        }catch(error){
            res.status(500).json({msg:error.message})
        }
    },
    deleteCategory:async (req,res)=>{
        try{
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Category deleted"})
        }catch(error){
            console.error(error)
            return res.status(500).json({msg:error.message
            })
        }
    },
    updateCategory :async (req,res)=>{
        try{
            const{name}=req.body
            await Category.findByIdAndUpdate({_id:req.params.id},{name})
            res.json({msg:"Category updated"})
        }catch(error){
            return res.status(500).json({msg:error.message})
        }
       
    }
}

module.exports=categoryCtrl