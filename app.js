//require express
const express = require('express');

const app = express();

//setting port
const port = 5000;




app.listen(port, ()=> {

	console.log(`Server is **LIVE** on port ${port}`)
});

