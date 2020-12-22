const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product(title, price, description, imageUrl)
  product
    .save()
    .then((result) => {
      return res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const { title, price, description, imageUrl } = req.body

  const product = new Product(title, price, description, imageUrl, prodId)
    .save()
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId)
    .then((product) => {
      return product.destroy()
    })
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        products: products,
        path: '/admin/products',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
