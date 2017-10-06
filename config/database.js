if(process.env.NODE_ENV === 'production'){

module.exports = {mongoURI:'mongodb://Atul:welcome1@ds111895.mlab.com:11895/ideajot-prod'}
} else {

module.exports ={mongoURI:'mongodb://localhost/ideajot-dev'}

}