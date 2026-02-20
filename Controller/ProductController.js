const Product = require('../Models/ProductModel')
const Category = require('../Models/CategoryModel');

const AddProduct = async (req, res) => {
  try {
    const { pname, pdesc, pprice, pqty, catid } = req.body;
    const UserImage = req.file ? req.file.filename : null;
      const category = await Category.findById(catid);

    const newProduct = new Product({
      product_name: pname,
      product_desc: pdesc,
      product_price: pprice,
      product_image: UserImage,
      product_qty: pqty,
      categoryId: catid,
      category_name: category ? category.category_name : ""

    });

    await newProduct.save();
    res.status(201).json({ message: "Product is added", newProduct });
    console.log(newProduct);
    console.log("Product is added!!");

  } catch (error) {
    res.status(500).json({ message: "server error", error });
    console.log(error);
  }
}

const Getproduct = async (req, res) => {
  try {
    const getproduct = await Product.find(); 
    res.status(200).json({ message: "all Product fetched", getproduct });
    console.log(getproduct);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log(error);
  }
}

// get product by id
const GetproductById = async (req, res) => {
  try {
    const { pid } = req.params; // to take id from req or url
    const oneproduct = await Product.findById(pid); // find the id from product model

    if (!oneproduct) { // if product not found
      return res.status(404).json({ message: "product not found" });
    }
    console.log(oneproduct);
    return res.status(200).json({ message: "product found", oneproduct });

  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

// update product
const Updateproduct = async (req, res) => {
  try {
    const { pid } = req.params; // holds the value of id

     if (req.body.categoryId) {
      const category = await Category.findById(req.body.categoryId);
      req.body.category_name = category ? category.category_name : "";
    }

    const updatedproduct = await Product.findByIdAndUpdate(pid, req.body ,{ new: true });
    // req.body holds updated objects (fields and values sent from client)
    res.status(200).json({ message: "Product updated", updatedproduct });
  } catch (error) {
    console.log(error);
  }
}

// delete product
const Deleteproduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleteproduct = await Product.findByIdAndDelete(pid);
    res.status(200).json({ message: "Product deleted", deleteproduct });

  } catch (error) {
    console.log(error);
  }
}


const SearchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    const products = await Product.find({
      product_name: { $regex: query, $options: "i" } // case-insensitive search
    });

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { AddProduct, Getproduct, GetproductById, Updateproduct, Deleteproduct , SearchProducts};
