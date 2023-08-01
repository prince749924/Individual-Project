const router = require("express").Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Users = require("../models/userModel");
// const Notifications = require("../models/notificationsModel");
// Add new Product
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    // Send Notifications
    const admins = await Users.find({ role: "admin" });
    // admins.forEach(async (admin) => {
    //   const newNotification = new Notifications({
    //     user: admin._id,
    //     message: `New Product added by ${req.user.name}`,
    //     title: "New Product",
    //     onClick: `/admin`,
    //     read: false,
    //   });
    //   await newNotification.save();
    // });
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});

// Get Product By Id
router.get("/get-product-by-id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
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

// Get all Products
router.post("/get-products", async (req, res) => {
  try {
    const { seller, category = [], age = [], status } = req.body;
    let filters = {};

    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    // Filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }
    const products = await Product.find(filters)
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

// Edit Product
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// Delete product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete product",
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
  "/upload-image-to-product",
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

      const productId = req.body.productId;
      // Update the product's images array with the uploaded image URL
      await Product.findByIdAndUpdate(productId, {
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

// Update product status
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate the 'status' value here if needed

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      status: status, // Update the 'status' field with the provided value
    });

    // Send notification to seller
    // const newNotification = new Notifications({
    //   user: updatedProduct.seller,
    //   message: `Your Product ${updatedProduct.name} has been ${status}`,
    //   title: "Product Status Updated",
    //   onClick: `/profile`,
    //   read: false,
    // });

    // await newNotification.save();

    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Wishlist work
router.post("/wish-product", async (req, res) => {
  try {
    const { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields must be required" });
    } else {
      const wishProducts = await Product.find({ _id: { $in: productArray } });
      if (wishProducts.length > 0) {
        return res.json({ Products: wishProducts });
      }
    }
    return res.json({ error: "No products found" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Filtering products failed" });
  }
});

module.exports = router;
