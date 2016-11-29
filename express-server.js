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
  var response = req.session.notes || [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
  res.append('Access-Control-Allow-Origin', '*')
  res.status(200).json(response);
})

app.post('/notes', function(req, res) {
  console.log('Request to add note' + req.body)
  if (!req.session.notes) {
    req.session.notes = [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
    req.session.last_note_id = 3;
  }

  var note = req.body;
  note.id = req.session.last_note_id;
  req.session.last_note_id++;
  req.session.notes.push(note);

  res.end();
})

app.delete('/notes', function(req, res) {
  console.log('Drop note with id equal to ' + req.query.id);
  var id = req.query.id;
  var notes = req.session.notes|| [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
  var updatedNotesList = [];
  for (var i=0;i<notes.length;i++) {
    if (notes[i].id != id) {
      updatedNotesList.push(notes[i]);
    }
}
req.session.notes = updatedNotesList;
res.end();

});

app.post('/top', function(req, res) {
  console.log(req.body);
  console.log('Putting to top note with id : ' + req.body.id);
  var id = req.body.id;
  var notes = req.session.notes|| [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
  var updatedNotesList = [];
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id != id) {
      updatedNotesList.push(notes[i])
    } else {
      updatedNotesList.unshift(notes[i])
    }
  }

  req.session.notes = updatedNotesList;
  res.end();
})


app.listen(3000);
