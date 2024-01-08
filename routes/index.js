
const localStrategy=require("passport-local")
var express = require('express');
var router = express.Router();
const UserModel=require("./users");
const passport = require("passport");
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/profile',isLoggedIn, async function(req, res, next) {
  
  res.render("profile"); 


});
router.post('/register',function(req, res){
  var userdata=new UserModel({
    username:req.body.username,
    secret:req.body.secret
  });
  UserModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})
router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/")
  })
})
router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){
  
})
router.post('/lo',function(res,req,next){
  res.render("login")
})
router.post('/lo',function(req,res,next){
  var userdata=new UserModel({
    username:req.body.username,
    secret:req.body.secret
  });
  UserModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })

// res.send("hello")
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

module.exports = router;
