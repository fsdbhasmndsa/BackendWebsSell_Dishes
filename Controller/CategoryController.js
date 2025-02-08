const Category = require("../Schema/categorySchema")
const Product =  require("../Schema/productSchema")

module.exports.GetAll = async (req, res) => {

    const items = await Category.find().select("name  ").lean()

    res.json({ message: "Get successful", items: items })

}

module.exports.FindByIdCategory = async (req, res) => {
    const IdCategory = req.params.id
    const items = await Product.find({category:IdCategory}).select("-createdAt -updatedAt -category").lean()

    res.json({ message: "Get successful", items: items })

}