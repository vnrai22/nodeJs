const express = require('express');
const path = require('path');		//required when you use __dir
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db= mongoose.connection;
//check connection
db.once('open', function(){
	console.log('Connected to mongoDB');
});


//check DB error
db.on('error', function (err){
	console.log(err);
});

//app initialization
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));	//__dirname meand current directory and views in folder inside current dir
app.set('view engine', 'pug');
//bring models
let Articles = require ('./models/article');
//Body parser middleware copied form github bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//home route
app.get('/', function(req,res){
        Articles.find({}, function(err, articles){
		if(err){
			console.log(err);
		}
		else{
			res.render('index', {
			title: 'Articles',
			articles: articles
			
			});
		}
	});
});

//Add route
app.get('/articles/add', function(req,res){
	res.render('add_article', {
	title: 'Add Article'
});
});

//Add Submt Post route 
app.post('/articles/add', function(req,res){
	let article = new Articles 		//create a object of Article which comes from model
	article.title = req.body.title;		//need body-parser module installed to use body and parse data from html
	article.author = req.body.author;
	article.body = req.body.body;

	//save it to model
	article.save(function(err){
	if(err){
		console.log(err);
		return;
	}

	else{
		res.redirect('/');	//redirect to homepage 
	}

	});
});

//start server
app.listen(3000, function(req,res){

        console.log("Serer is running at 3000");
});

