
const adminMiddleware = (req, res, next) =>{
  let user = req.session.user;
  if(user.role == 'admin'){
    next()
  }else{
    res.status(200).json({msg: 'usuario no autorizado!'})
  }
}

module.exports = adminMiddleware