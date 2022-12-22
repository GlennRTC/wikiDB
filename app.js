const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose",);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect('mongodb+srv://dbadmin:jkmq9x25@atlascluster.bsfuaqw.mongodb.net/wikiDB', {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// Listener Server
app.listen(3000, function(){
    console.log("Server has started successfully");
})
