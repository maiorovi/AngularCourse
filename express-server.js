var express = require('express');
var app =express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor',
new Server("localhost", 27017, {safe: true},
{auto_reconnect: true}, {}));
db.open(function(){
console.log("mongo db is opened!");
db.collection('notes', function(error, notes) {
db.notes = notes;
});
});


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
  // var response = req.session.notes || [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
  db.notes.find(req.query).toArray(function(err, items) {
    res.status(200).json(items);
  });

})

app.post('/notes', function(req, res) {
  console.log('Request to add note' + JSON.stringify(req.body));
  // if (!req.session.notes) {
  //   req.session.notes = [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
  //   req.session.last_note_id = 3;
  // }
  //
  // var note = req.body;
  // note.id = req.session.last_note_id;
  // req.session.last_note_id++;
  // req.session.notes.push(note);
  //
  // res.end();
  db.notes.insert(req.body);
  res.end();
})

app.delete('/notes', function(req, res) {
  console.log('Drop note with id equal to ' + req.query.id);
//   var id = req.query.id;
//   var notes = req.session.notes|| [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
//   var updatedNotesList = [];
//   for (var i=0;i<notes.length;i++) {
//     if (notes[i].id != id) {
//       updatedNotesList.push(notes[i]);
//     }
// }
// req.session.notes = updatedNotesList;
var id = new ObjectID(req.query.id);
console.log(id);
db.notes.remove({_id: id}, function(err){
if (err) {
console.log(err);
res.send("Failed");
} else {
res.send("Success");
}
})

});

app.post('/top', function(req, res) {

  console.log('Putting to top note with id : ' + req.body.id);
  var id = req.body.id;
  var notes = db.notes.find();
  // var notes = req.session.notes|| [{id:0,text: "First note"},{id:1, text: "Second note"},{id:2, text: "Third note"}];
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
});

app.listen(3000);
