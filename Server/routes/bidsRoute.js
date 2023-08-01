const Bid = require("../models/bidModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();
// POST new Bids

router.post("/place-new-bid", async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.send({ success: true, message: "Bid placed successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Get all Bids
router.post("/get-all-bids", authMiddleware, async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }

    const bids = await Bid.find({ filters })
      .populate("product")
      .populate("buyer")
      .populate("seller").sort({createdAt: -1});
    res.send({ success: true, data: bids });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
