const express = require("express");
const path = require("path");
const app = express();
const handlebars = require('express-handlebars')
app.get("/", (req, res) => {
  res.render('home')
});
app.engine('hbs',handlebars.engine({
  extname:'.hbs',
}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'resour','views'));
app.use(express.static(path.join(__dirname,'public')));
app.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000");
});

