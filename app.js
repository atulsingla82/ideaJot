//require dependencies
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//require models
require('./models/Idea')

//map global promise to get rid of warning
mongoose.Promise = global.Promise


//connect to mongoose 
mongoose.connect('mongodb://localhost/ideajot-dev',{

	useMongoClient:true
})

.then(()=> console.log('MongoDB is connected...'))
.catch(err => console.log(err));


//load idea model
const idea = mongoose.model('ideas');

//index route
app.get('/', (req, res) => {
const title = 'Welcome'
res.render('index',{
    title:title
  })
 
});

//about page
app.get('/about',(req,res) => {
res.render('about')
})

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up port
const port = 5000;




app.listen(port, ()=> {
	console.log(`Server is **LIVE** on port ${port}`)
	console.log('===============================')
});

