//require dependencies
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express();

//require models
require('./models/Idea')

//map global promise to get rid of deprecation warning
mongoose.Promise = global.Promise


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

//method override middleware
app.use(methodOverride('_method'));


//load idea model
const Idea = mongoose.model('ideas');

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

//Add ideas form page route
app.get('/ideas/add',(req,res) => {
res.render('ideas/add')
})

// edit ideas form 
app.get('/ideas/edit/:id',(req,res) => {
	Idea.findOne({
		_id:req.params.id
	})
	.then(idea =>{
res.render('ideas/edit',{
         
         idea:idea
       });

	});

});

//Add ideas index page route
app.get('/ideas',(req,res) => {
	Idea.find({})
	.sort({date:'desc'})
	.then(ideas => {
		res.render('ideas/index',{
			ideas:ideas
		});
	});
});


// Post ideas route
app.post('/ideas', (req, res) =>{
  
  // res.send("hello")
  let errors = []

  if (!req.body.title){
   errors.push({text:'Please add a title'})
  }

  if (!req.body.details){
   errors.push({text:'Please add some details'})
  }

  if (errors.length > 0 ){
  	res.render('ideas/add', {
      errors:errors,
      title:req.body.title,
      details:req.body.details
  	})
  } else {	
  	const newUser = {
       title:req.body.title,
       details:req.body.details

  	}

  	new Idea(newUser)
  	  .save()
  	  .then(idea =>{
  	  	res.redirect('/ideas');
  	  })
  }
	
});

// Edit Form process

  app.put('/ideas/:id', (req, res) => {
    
    Idea.findOne({
    	_id:req.params.id
    })
  	.then(idea => {
      //new values
      idea.title = req.body.title;
      idea.details = req.body.details;
      
      idea.save()
         .then(idea => {
            res.redirect('/ideas');

         })
  	})
  });

  // Delete Idea

    app.delete('/ideas/:id', (req,res) => {
        Idea.remove({_id:req.params.id})
        .then(() => {
        	res.redirect('/ideas')
        });

    });



//setting up port
const port = 5000;




app.listen(port, ()=> {
	console.log(`Server is **LIVE** on port ${port}`)
	console.log('===============================')
});

