const express = require("express");
const { AddProduct, Getproduct, GetproductById, Updateproduct, Deleteproduct, SearchProducts } = require("../Controller/ProductController");
const upload = require("../Middleware/Upload"); // if using multer

const router = express.Router();

router.post("/AddProduct", upload.single("pimage"), AddProduct);
router.get("/Getproduct", Getproduct);
router.get("/GetproductById/:pid", GetproductById);
router.put("/Updateproduct/:pid", Updateproduct);
router.delete("/Deleteproduct/:pid", Deleteproduct);
router.get("/search", SearchProducts);

module.exports = router;
