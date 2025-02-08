const mongoose = require('mongoose');
const GenerateToken =  require("../Helper/GenerateToken")
const Product =  require("../Schema/productSchema")



module.exports.GET_ALL = async (req,res) =>{

   const items =  await Product.find({category:`67a410d36e833f76673865db`}).select("-createdAt -updatedAt -description ").lean();
   
    res.json({message:"running",items:items})
}

module.exports.GetDetailProduct = async (req,res)=>{
    const id = req.params.id
    console.log("first",id)
    const itemDetail = await Product.findOne({_id:id}).populate('category', 'name -_id').select("-createdAt -updatedAt ").lean()
    res.json({message:"running",items:itemDetail})
}

module.exports.getProductSimilar = async (req,res)=>{
    const id = req.params.id
    console.log("first",id)
    const IDcategory = await Product.findOne({_id:id}).select("category").lean()
    console.log("IDcategory",IDcategory.category)
    const itemsSimilar = await Product.find({category:IDcategory.category}).select("-createdAt -updatedAt ").lean()


    res.json({message:"running",items:itemsSimilar})
}