module.exports = {

   ensureAuthenticated: function(req,res,next) {

   	if (req.isAuthenticated()){

   		return next();

   	}
   	req.flash('error_msg', 'Please Log in or register');
   	res.redirect('/users/login');
   }
}