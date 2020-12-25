const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email, cart) {
    this.username = username
    this.email = email
    this.cart = cart
    this._id = id
  }

  save() {
    const db = getDb()
    return db
      .collection('users')
      .insertOne(this)
      .then((user) => {
        console.log(user)
        return user
      })
      .catch((err) => console.log(err))
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id
    // })
    const updatedCart = { items: [{ ...product, quantity: 1 }] }
    const db = getDb()
    db.collection('users').updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    )
  }

  static findById(userId) {
    const db = getDb()
    return db.collection('users').findOne({ _id: new ObjectId(userId) })
  }
}

module.exports = User
