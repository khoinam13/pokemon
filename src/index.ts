const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const flash = require('connect-flash');
const session = require('express-session');
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false

}))
app.use(flash());
app.get("/login/:slug", (req, res) => {
  res.render('home',{
    NameUser: req.params.slug
  })
});
app.get("/",(req,res)=>{
  res.render('user',{
    messageErr: req.flash('messageErr'),
    messageValue: req.flash('messageValue')
  })
})

//middlewave
app.use(express.urlencoded())
app.use(express.json())
app.post('/user/store',(req,res)=>{
    const nameUser = req.body
    if(nameUser.user === '' || nameUser.user.length <3){
      req.flash('messageErr','Tên người dùng không hợp lệ vui lòng nhập lại');
      req.flash('messageValue',`${nameUser.user}`)
      res.redirect('/')
    }
    else{
      res.redirect(`/login/${nameUser.user}`)
    }
    
})
app.engine('hbs',handlebars.engine({
  extname:'.hbs',
}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'resour','views'));
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(path.join(__dirname,'dist')));
app.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000");
});

