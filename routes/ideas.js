const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//require models
require('../models/Idea')

//load idea model
const Idea = mongoose.model('ideas');


//Add ideas form page route
router.get('/add',(req,res) => {
res.render('ideas/add')
})

// edit ideas form 
router.get('/edit/:id',(req,res) => {
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
router.get('/',(req,res) => {
	Idea.find({})
	.sort({date:'desc'})
	.then(ideas => {
		res.render('ideas/index',{
			ideas:ideas
		});
	});
});


// Post ideas route
router.post('/', (req, res) =>{
  
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
  	  	req.flash('success_msg', 'New Listing Added')
  	  	res.redirect('/ideas');
  	  })
  }
	
});

// Edit Form process

  router.put('/:id', (req, res) => {
    
    Idea.findOne({
    	_id:req.params.id
    })
  	.then(idea => {
      //new values
      idea.title = req.body.title;
      idea.details = req.body.details;
      
      idea.save()
         .then(idea => {
         	req.flash('success_msg', 'Listing Updated')
            res.redirect('/ideas');

         })
  	})
  });

  // Delete Idea

    router.delete('/:id', (req,res) => {
        Idea.remove({_id:req.params.id})
        .then(() => {
        	req.flash('success_msg', 'Listing Removed')
        	res.redirect('/ideas')
        });

    });


module.exports = router;