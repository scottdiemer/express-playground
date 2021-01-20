exports.getLogin = (req, res, next) => {
  const cookie = req.get('Cookie')
  let isLoggedIn
  if (cookie !== null) {
    isLoggedIn = req.get('Cookie').split('=')[1]
  }

  console.log(isLoggedIn)

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
  })
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true')
  res.redirect('/')
}
