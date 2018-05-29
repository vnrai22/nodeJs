const express = require('express');
const path = require('path');		//required when you use __dir

//app initialization
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));	//__dirname meand current directory and views in folder inside current dir
app.set('view engine', 'pug');

//home route
app.get('/', function(req,res){
        
let articles = [

	{
	 id:1 ,
	 title: 'Article One',
	 Author: 'Vinay Rai',
	 body: 'This is article one'
	},
	{  
	 id:1 ,
         title: 'Article Two',
         Author: 'Vinay Rai',
         body: 'This is article Two'
        },

]

	res.render('index', {
	title: 'Articles',
	articles: articles 
});				//index is index.pug
});

//Add route
app.get('/articles/add', function(req,res){
	res.render('add_article', {
	title: 'Add Article'
});
});


//start server
app.listen(3000, function(req,res){

        console.log("Serer is running at 3000");
});

