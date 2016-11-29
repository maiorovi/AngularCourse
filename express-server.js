var express = require('express');
var app =express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'angular_tutorial',
  resave: true,
  saveUninitialized: true
}));

app.get('/greeting', function(req, res) {
  console.log('Received get /greeting with name' + req.query.name);
  res.status(200).send('Hello '+ req.query.name +  '! I\'am server!' )
})

app.get('/notes', function(req,res) {
  console.log('received request for: ' + req.originalUrl)
  var response = req.session.notes || [{text: "First note"},{text: "Second note"},{text: "Third note"}];
  res.append('Access-Control-Allow-Origin', '*')
  res.status(200).json(response);
})

app.post('/notes', function(req, res) {
  console.log('Request to add note' + req.body)
  if (!req.session.notes) {
    req.session.notes = [{text: "First note"},{text: "Second note"},{text: "Third note"}];
    req.session.last_note_id = 0;
  }

  var note = req.body;

  note.id = req.session.last_node_id;
  req.session.last_note_id++;
  req.session.notes.push(note);
  
  res.end();
})


app.listen(3000);
