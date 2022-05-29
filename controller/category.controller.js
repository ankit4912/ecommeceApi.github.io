import Category from "../models/category.model";

//** Create Category */

export const newCategory = async (req, res) => {
  const categoryAdd = new Category({
    name: req.body.name,
  });
  categoryAdd
    .save()
    .then((createdCategory) => {
      res.status(200).json(createdCategory);
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
        status: false,
      });
    });
};

//** Read Category */

export const findCategoryAll = async (req, res) => {
  const categoryFind = await Category.find();

  if (!categoryFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(categoryFind);
};

export const findCategory = async (req, res) => {
  const categoryFind = await Category.findById(req.params.id);

  if (!categoryFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(categoryFind);
};

//** Update Category */

export const editCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const CategoryEdit = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(CategoryEdit);
  } catch (err) {
    res.status(404).send(err);
  }
};

//** Remove Category */

export const removeCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const CategoryEdit = await Category.findByIdAndDelete(_id, req.body);
    res.send(CategoryEdit);
  } catch (err) {
    res.status(404).send(err);
  }
};
