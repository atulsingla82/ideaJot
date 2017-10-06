//require dependencies
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const passport = require ('passport');
const session = require('express-session');
const app = express();


//map global promise to get rid of deprecation warning
mongoose.Promise = global.Promise

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config file 
require ('./config/passport')(passport);

//connect to mongoose 
mongoose.connect('mongodb://localhost/ideajot-dev',{
	useMongoClient:true
})

.then(()=> console.log('MongoDB is connected...'))
.catch(err => console.log(err));

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public'))); 

//method override middleware
app.use(methodOverride('_method'));

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
  //Passport Middleware 
  app.use(passport.initialize());
  app.use(passport.session());

// connect flash
app.use(flash());

//global variables for success && error messages
app.use(function(req, res, next ) {
 res.locals.success_msg = req.flash('success_msg')
 res.locals.error_msg = req.flash('error_msg')
 res.locals.error = req.flash('error')
 res.locals.user = req.user || null;
 next();
});


// Use ideas Routes 
  app.use('/ideas' , ideas);

// Use users Routes 
  app.use('/users' , users);

//index route
app.get('/', (req, res) => {
const title = 'ideaJot'
res.render('index',{
    title:title
  })
 
});

//about page route
app.get('/about',(req,res) => {
res.render('about')
})



  

//setting up port
const port = 5000;




app.listen(port, ()=> {
	console.log(`Server is **LIVE** on port ${port}`)
	console.log('===============================')
});

