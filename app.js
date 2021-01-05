const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const errorController = require('./controllers/error')
// const User = require('./models/user')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//   User.findById('5fe2b2ac494b11caca444610')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id)
//       next()
//     })
//     .catch((err) => console.log(err))
// })

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
