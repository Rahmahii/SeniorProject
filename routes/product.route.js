const express = require('express')
const productController = require('../controllers/product.controller')
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './products');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/StoreProducts", productController.getProductsByStore)
router.post("/FindProductByBarcode", productController.FindProductByBarcode)
router.get("/getAll", productController.index)
router.post("/StorAdminView", productController.StorAdminView)
router.post("/FindSimilar", productController.FindSimilar)

router.post("/AddProduct", upload.single('image'), productController.create)
router.post("/UpdateProduct", upload.single('image'), productController.update)

module.exports = router