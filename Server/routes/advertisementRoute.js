const router = require("express").Router();
const Ads = require("../models/advertisementModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Users = require("../models/userModel");
// const Notifications = require("../models/notificationsModel");
// Add new Advertisement
router.post("/add-ads", authMiddleware, async (req, res) => {
  try {
    const newAds = new Ads(req.body);
    await newAds.save();

    const admins = await Users.find({ role: "admin" });

    res.send({
      success: true,
      message: "Advertisement added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to add Advertisement",
      error: error.message,
    });
  }
});

// Get Advertisement By Id
router.get("/get-ads-by-id/:id", async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false, // Set success to false when there is an error
      message: error.message,
    });
  }
});

// Get all Advertisement
router.post("/get-ads", async (req, res) => {
  try {
    // Filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }
    const products = await Ads.find()
      .populate("seller")
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      data: products, // Explicitly specify the products property
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Edit Advertisement
router.put("/edit-ads/:id", authMiddleware, async (req, res) => {
  try {
    await Ads.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Advertisement updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update Advertisement",
      error: error.message,
    });
  }
});

// Delete Advertisement
router.delete("/delete-ads/:id", authMiddleware, async (req, res) => {
  try {
    await Ads.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Advertisement deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete Advertisement",
      error: error.message,
    });
  }
});

// Get image from PC
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload-image-to-ads",
  authMiddleware, // Use the authMiddleware to authenticate the user
  multer({ storage: storage }).single("file"), // Use multer middleware to handle file upload
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MarketHub",
      });

      const adsId = req.body.adsId;
      // Update the product's images array with the uploaded image URL
      await Ads.findByIdAndUpdate(adsId, {
        $push: { images: result.secure_url },
      });

      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
