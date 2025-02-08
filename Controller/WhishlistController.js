const wishlist = require("../Schema/wishlistSchema")

module.exports.viewWishlist = async (req, res) => {

    try {
        const items = await wishlist.find({ userId: req.user._id })
        res.json({ code: 200, message: "Get successful", items: items })
    } catch (error) {
        res.json({ code: 400, message: "Get failded" })
    }

}
module.exports.addWishlist = async (req, res) => {
    const id = req.user._id;
    const SP = req.body;
    try {
        const wishlist1 = await wishlist.findOne({ userId: id });
        if(!wishlist1)
        {
            const wish =  new wishlist({userId:id,items:SP})
            wish.save()

        }
        else {
            wishlist1.items.push(SP);
            wishlist1.save()
        }
        
        res.json({ code: 200, message: "Successful" })
    } catch (error) {
        res.json({ code: 400, message: "Failed" })
    }
}
module.exports.deleteWishlist = async (req, res) => {
    const id = req.user._id;
    const idSP = req.params.id;

    try {
        const wishlist1 = await wishlist.findOne({ userId: id });
        const index = wishlist1.items.findIndex((item) => item._id == idSP)
        wishlist1.items.splice(index, 1)
        wishlist1.save();
        res.json({ code: 200, message: "Successful" })
    } catch (error) {
        res.json({ code: 400, message: "Failed" })
    }

}

module.exports.CheckWishList = async (req, res) => {
    const id = req.user._id;
    const idSP = req.params.id;
    try {
        const wishlist1 = await wishlist.findOne({ userId: id, "items._id": idSP });
        let choose = false;
        if(wishlist1)
        {
            choose = true
        }
        console.log("first")
        res.json({ code: 200, message: "Successful",status:choose })
    } catch (error) {
        res.json({ code: 400, message: "Failed" })
    }
}