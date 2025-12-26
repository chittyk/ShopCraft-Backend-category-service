const express =require('express')
const { createCategory, getCategory, getCategoryByid, updateCategory, deleteCategory } = require('../controller/categoryController')
const Category = require('../model/Category')
const adminAuth = require('../middlewares/adminAuth')
const router = express.Router()

router.post('/',createCategory)
router.get('/',getCategory)
router.get("/:id",getCategoryByid)

router.put("/:id",adminAuth,updateCategory)
router.delete('/:id',adminAuth,deleteCategory)

module.exports = router  