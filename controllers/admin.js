const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.isLoggedIn,
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  })
  product
    .save()
    .then((result) => {
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
  // const { title, price, description, imageUrl } = req.body
  // const product = new Product({
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  //   userId: req.user,
  // })
  // product
  //   .save()
  //   .then((result) => {
  //     return res.redirect('/admin/products')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
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
        isAuthenticated: req.isLoggedIn,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const { title, price, description, imageUrl } = req.body

  Product.findById(prodId)
    .then((product) => {
      product.title = title
      product.price = price
      product.description = description
      product.imageUrl = imageUrl
      return product.save()
    })
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        products: products,
        path: '/admin/products',
        isAuthenticated: req.isLoggedIn,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
