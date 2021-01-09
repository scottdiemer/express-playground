const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const errorController = require('./controllers/error')
const User = require('./models/user')
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('5ff52a12fc6992151e1e8a4f')
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Scott',
          email: 'scott@fakeemail.com',
          cart: {
            items: [],
          },
        })
        user.save()
      }
    })
    app.listen(3000)
  })
  .catch((err) => console.log(err))
