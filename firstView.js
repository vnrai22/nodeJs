const express = require('express');
const path = require('path');		//required when you use __dir

//app initialization
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));	//__dirname meand current directory and views in folder inside current dir
app.set('view engine', 'pug');

//home route
app.get('/', function(req,res){
        res.render('index');				//index is index.pug
});
//start server
app.listen(3000, function(req,res){

        console.log("Serer is running at 3000");
});

