//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/comments', function(req, res) {
    res.json(comments);
});

app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.error(err);
        }
    });
    res.json(comments);
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});