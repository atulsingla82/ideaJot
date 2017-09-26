//require express
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

//Index route
app.get('/', (req, res) => {
  
  res.render('index')

});

//About page

app.get('/about',(req,res) => {

	res.send('about')
})

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting port
const port = 5000;




app.listen(port, ()=> {

	console.log(`Server is **LIVE** on port ${port}`)
});

