//require express
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

//index route
app.get('/', (req, res) => {
const title = 'Welcome !!'
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
});

