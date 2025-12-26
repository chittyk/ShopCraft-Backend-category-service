const Category = require("../model/Category");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required" });

    const isExist = await Category.findOne({ name });
    if (isExist) return res.status(401).json({ msg: "category already exist" });

    const newCategory = new Category({
      name,
      description,
    });
    newCategory.save();
    res.status(201).json({
      msg: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) return res.status(402).json({ msg: "Category is Empty" });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const getCategoryByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(401).json({ msg: "missing data" });

    const category = await Category.findById(id);
    if (!category) return res.status(402).json({ msg: "no Category found" });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedCategory = await Category.findByIdAndUpdate( id , updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedCategory)
      return res.status(404).json({ msg: "Category not found" });
    res.status(200).json({
      msg: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ msg: "missing data" });

    const deleteCategory = await Category.findByIdAndDelete( id );

    if (!deleteCategory)
      return res.status(404).json({ msg: "Category not found" });

    res.status(200).json({
      msg: "Category deleted successfully",
      deleteCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategory,
  getCategoryByid,
  updateCategory,
  deleteCategory
};
