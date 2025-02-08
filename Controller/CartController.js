const Cart = require("../Schema/cartSchema")


module.exports.viewCart = async (req, res) => {
    const id = req.user._id

    const Listcart = await Cart.find({ userId: id }).select("-createdAt -updatedAt")




    try {
        res.json({ code: 200, message: "Get successful", Listcart: Listcart[0].items || Listcart })
    } catch (error) {
        res.json({ code: 400, message: "Get failed" })
    }
}

module.exports.AddtoCart = async (req, res) => {
    const idUser = req.user._id
    const {productId,quantity} = req.body
    console.log("productId 1 ",productId)
    console.log("quantity 1",quantity)

    try {
        const cart = await Cart.findOne({ userId: idUser })

        const index = cart.items.findIndex((item) => item._id == productId._id)
        if (index == -1) {
            productId.quantity =quantity
            cart.items.push(productId)
            console.log("cart",productId)
            cart.save()
        }
        else {
            console.log("cart",cart)
            console.log("index",index)
            cart.items[index].quantity += 1;
            console.log("cart",cart)
            cart.save()
        }

        res.json({ code: 200, message: "Get Successful" })
    } catch (error) {
        console.log("error",error)
        res.json({ code: 400, message: "Get failed" })
    }
}

module.exports.decreasetoCart = async (req, res) => {
    const idUser = req.user._id
    const idP = req.body.productId

    try {
        const cart = await Cart.findOne({ userId: idUser })
        const index = cart.items.findIndex((item) => item._id == idP._id)
        cart.items[index].quantity -= 1;
        cart.save()
        res.json({ code: 200, message: "Get Successful",idP:idP._id })
    } catch (error) {
        res.json({ code: 400, message: "Get failed" })
    }

}

module.exports.increasetoCart = async (req, res) => {
    const idUser = req.user._id
    const idP = req.body.productId
    console.log("first",idP )
    try {
        const cart = await Cart.findOne({ userId: idUser })
        const index = cart.items.findIndex((item) => item._id == idP._id)
        console.log("index",index)
        cart.items[index].quantity += 1;
        cart.save()
        res.json({ code: 200, message: "Get Successful",idP:idP._id })
    } catch (error) {
        res.json({ code: 400, message: "Get failed" })
    }
}


module.exports.ReducetoCart = async (req, res) => {
    const idUser = req.user._id
    const idP = req.body
    console.log("body",idP)
    try {
        const cart = await Cart.findOne({ userId: idUser })
        const index = cart.items.findIndex((item) => item._id == idP._id)
        cart.items.splice(index,1)
        cart.save()
        res.json({ code: 200, message: "Get Successful" })
    } catch (error) {
        console.log("error")
        res.json({ code: 400, message: "Get failed" })
    }
}

module.exports.clearCart = async (req, res) => {

}

module.exports.AddALotWhenLogin = async (req, res) => {
    const id = req.user._id
    const idcart = req.params.id
    const items = req.body
    console.log("idcart", idcart)
    console.log("items", items)
    try {
        const Products = items.map((product) => ({

            _id: product._id,
            name: product.name,
            description: product.description || "",
            price: product.price,
            discount: product.discount || 0,
            imageUrl: product.imageUrl,
            quantity: product.quantity || 1, // Nếu không có quantity, mặc định là 1


        }))

        await Cart.updateOne({ _id: idcart, items: Products })
        console.log("chạy tới đây")
        res.json({ code: 200, message: "Add successful" })
    } catch (error) {
        res.json({ code: 400, message: "Add failed" })
    }
}