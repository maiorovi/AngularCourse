var express = require('express');
var app =express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/greeting', function(req, res) {
  console.log('Received get /greeting with name' + req.query.name);
  res.status(200).send('Hello '+ req.query.name +  '! I\'am server!' )
})


app.listen(3000);
