const express=require('express')
const storeController=require('../controllers/store.controller')
const router=express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './logos');
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

router.get("/getStoresNames",storeController.getStoresNames)
router.post("/AddStore",upload.single('logo'),storeController.create)
router.post("/findNearest", storeController.findNearest)
router.post("/address",storeController.GetAddress)

module.exports=router