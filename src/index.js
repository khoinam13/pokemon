var express = require("express");
var path = require("path");
var app = express();
var handlebars = require('express-handlebars');
app.get("/", function (req, res) {
    res.render('home');
});
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resour', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function () {
    console.log("Server is listening at http://localhost:3000");
});
