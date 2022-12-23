const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose",);
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://dbadmin:jkmq9x25@atlascluster.bsfuaqw.mongodb.net/wikiDB', {useNewUrlParser: true});

// MongoDB Schema
const articleSchema = {
    title: String,
    content: String
};

//MongoDB model
const Article = mongoose.model("Article", articleSchema);

//----------------------------Request targetting ALL articles----------------------------/
//Chain Routing (Code Refactored)
app.route("/articles")

// GETting all the articles from MongoDB.
.get(function (req, res) {
    Article.find(function (err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})

// POSTing a new article to MongoDB.
.post(function (req,res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    // Save new article on MongoDB
    newArticle.save(function (err) {
        if (!err) {
            res.send("Succesfully added a new article");
        } else {
            res.send(err);
        }
    });
})

// DELETing articles from MongoDB
.delete(function (req,res) {
    Article.deleteMany(function(err){
        if (!err) {
            res.send("Succesfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});

//----------------------------Request targetting specific articles----------------------------/
app.route("/articles/:articleTitle")


.get(function (req,res) {
   Article.findOne({title: req.params.articleTitle}, function (err, foundArticle) {
    if (foundArticle) {
        res.send(foundArticle);
    } else {
        res.send("No articles matching the title.");
    }
   }); 
})

//UPDATIng an specific article (both title and content)
.put(function (req,res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function (err) {
        if (!err) {
            res.send("Succesfully updated article");
        } else {
            res.send(err);
        }
    });
    
})

// PATCHing an specific field.
.patch(function (req,res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        function (err) {
            if (!err) {
                res.send("Succesfully patch the values");
            } else {
                res.send(err);
            }
        }
    );
})

//DELETE specific articles.
.delete(function (req,res) {
    Article.deleteOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function (err) {
            if (!err) {
                res.send("Article deleted successfully.");
            } else {
                res.send(err);
            }
        }
    );
});

// Listener Server
app.listen(3000, function(){
    console.log("Server has started successfully");
})
