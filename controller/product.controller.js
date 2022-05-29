import Product from "../models/product.model";
import Category from "../models/category.model";
import subCategory from "../models/sub-category.model";
import mongoose from "mongoose";
import { query } from "express";

//** Create Product */

export const productNew = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const subcategory = await subCategory.findById(req.body.subcategory);
  if (!subcategory) return res.status(400).send("Invalid SubCategory");

  try {
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      countInStock: req.body.countInStock,
      customerRating: req.body.customerRating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });
    product = await product.save();
    if (!product) return res.status(500).send("The product cannot be created");

    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
};

//** Read Product */

export const findProductAll = async (req, res) => {
  const productFind = await Product.find()
    .select("name brand price category subcategory countInStock -_id")
    .populate("category", "name -_id")
    .populate("subcategory", "name -_id");

  if (!productFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(productFind);
};

export const findProduct = async (req, res) => {
  const productFind = await Product.findById(req.params.id)
    .populate("category")
    .populate("subcategory");

  if (!productFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(productFind);
};

//** error */

export const findProductBy = async (req, res) => {
  // let filter = {};
  // if (req.query.category) {
  //   filter = { category: req.query.category.split(",") };
  // }
  // const productFind = await Product.find(filter)
  //   // .select("name brand price category subcategory countInStock -_id")
  //   .populate("category");
  // // .populate("subcategory");
  // if (!productFind) {
  //   res.status(500).json({
  //     Error: err,
  //     status: false,
  //   });
  // }
  // res.send(productFind);
  // const qNew = req.query.new;
  // const qCategory = req.query.category;
  // try {
  //   let products;
  //   if (qCategory) {
  //     products = await Product.find({
  //       categories: {
  //         $in: [qCategory],
  //       },
  //     }).populate("category", "name _id");
  //   } else {
  //     products = await Product.find();
  //   }
  //   res.status(200).json(products);
  // } catch (error) {
  //   res.status(500).json(err);
  // }
  //** */
  // let category = await Category.findOne({ Category: req.body.Category });
  // let subcategory = await subCategory.findOne({
  //   subCategory: req.body.subCategory,
  // });
  // if (category) {
  //   let search = await Product.find({ Category: category._id })
  //     .select("name brand price category subcategory countInStock -_id")
  //     .populate("category", "name -_id")
  //     .populate("subcategory", "name -_id");
  //   if (search) {
  //     return res.status(200).json({
  //       message: "Success",
  //       data: search,
  //       status: true,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       message: "Something went Wrong",
  //       status: false,
  //     });
  //   }
  // }
  // if (subcategory) {
  //   let search = await Product.find({ subCategory: subcategory._id })
  //     .select("name brand price category subcategory countInStock -_id")
  //     .populate("category", "name -_id")
  //     .populate("subcategory", "name -_id");
  //   if (search) {
  //     return res.status(200).json({
  //       message: "Success",
  //       data: search,
  //       status: true,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       message: "Something went Wrong",
  //       status: false,
  //     });
  //   }
  // }
  // if (!category && !subcategory) {
  //   let search = await Product.find({})
  //     .select("name brand price category subcategory countInStock -_id")
  //     .populate("category", "name -_id")
  //     .populate("subcategory", "name -_id");
  //   if (search) {
  //     return res.status(200).json({
  //       message: "Success",
  //       data: search,
  //       status: true,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       message: "Something went Wrong",
  //       status: false,
  //     });
  //   }
  // } else {
  //   return res.status(422).json({
  //     message: "Category of SubCategory does not exist...",
  //     status: false,
  //   });
  // }
  // let search_one = await Category.find({ Category: req.body.Category });
  // let search_two = await subCategory.find({
  //   subcategory: req.body.subcategory,
  //   category: search_one._id,
  // });
  // if (search_two && search_one) {
  //   let find_one = await Product.find({
  //     subcategory: search_two._id,
  //     category: search_one._id,
  //   })
  //     .populate("category")
  //     .populate("subcategory");
  //   if (find_one) {
  //     return res.status(200).json({
  //       message: "Success",
  //       data: find_one,
  //       status: true,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       message: "Category does Not exist...",
  //       status: false,
  //     });
  //   }
  // }
  // if (search_two && search_one) {
  //   let find_two = await Product.find({})
  //     .sort({ Product: 1 })
  //     .populate("category")
  //     .populate("subcategory");
  //   if (find_two) {
  //     return res.status(200).json({
  //       message: "Success",
  //       data: find_two,
  //       status: true,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       message: "Category does Not exist...",
  //       status: false,
  //     });
  //   }
  // }
  //
  // if (!productFind) {
  //   res.status(500).json({
  //     Error: err,
  //     status: false,
  //   });
  // }
  // res.send(productFind);
};

export const ProductFindBySubCategory = async (req, res) => {
  if (req.params.id) {
    let search = await Product.find({ subcategory: req.params.id })
      .populate("category")
      .populate("subcategory");
    if (search) {
      return res.status(200).json({
        message: "Success",
        data: search,
        status: true,
      });
    } else {
      return res.status(500).json({
        message: "Something went Wrong",
        status: false,
      });
    }
  } else {
    return res.status(422).json({
      message: " Sub-category does not exist...",
      status: false,
    });
  }
};

// export const editProduct = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const productEdit = await Product.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     res.send(productEdit);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// };

//** Update Product */

export const editProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const productEdit = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      countInStock: req.body.countInStock,
      customerRating: req.body.customerRating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );
  if (!productEdit) return res.status(500).send("the user cannot be updated!");
  res.send(productEdit);
};

//** Delete Product */

export const removeProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productEdit = await Product.findByIdAndDelete(_id, req.body);
    res.send(productEdit);
  } catch (err) {
    res.status(404).send(err);
  }
};

//** Product Count error */

export const countProduct = async (req, res) => {
  // const productCount = await Product.countDocuments((count) => count);
  // if (!productCount) {
  //   res.status(500).json({ success: false });
  // }
  // res.send({
  //   productCount: productCount,
  // });
  // try {
  //   const productCount = await Product.countDocuments((count) => count);
  //   if (!productCount) {
  //     res.status(500).json({ success: false });
  //   }
  //   res.send({
  //     productCount: productCount,
  //   });
  // } catch (error) {
  //   res.send(error);
  // }

  //** */

  let sub_category = await subCategory.findOne({
    subCategory: req.body.subCategory,
  });
  // console.log(sub_category);
  // const count = req.params.count ? req.params.count : 0;
  if (sub_category && sub_category._id) {
    let filter = await Product.find({
      subCategory: sub_category._id,
      price: { $gt: req.body.gt, $lt: req.body.lt },
    })
      .select("name brand price category subcategory countInStock -_id")
      .populate("category", "name -_id")
      .populate("subcategory", "name -_id");
    // .limit(+count);
    if (filter) {
      return res.status(200).json({
        message: "Success",
        data: filter,
        status: true,
      });
    } else {
      return res.status(500).json({
        message: "Something went Wrong",
        status: false,
      });
    }
  } else {
    return res.status(422).json({
      message: "SubCategory does not exist...",
      status: false,
    });
  }
  // let filter = {};

  // if (req.query.subcategories) {
  //   filter = { subCategory: req.query.subcategories.split(",") };
  // }
  // const productCount = await Product.find(filter).populate("subCategory");
  // if (!productCount) {
  //   res.status(500).json({ success: false });
  // }
  // res.send(productCount);
};

//** isFeatured */
export const countFeatured = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
};
