const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = new mongodb.ObjectId(id)
  }

  save() {
    const db = getDb()
    let dbOperation
    if (this._id) {
      // Update the product
      dbOperation = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      // Insert the product
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err))
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch((err) => console.log(err))
  }

  static findById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .findOne({ _id: mongodb.ObjectId(prodId) })
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => console.log(err))
  }
}

module.exports = Product
