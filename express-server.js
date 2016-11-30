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
  db.notes.find(req.query).sort({order:-1}).toArray(function(err, items) {
    res.status(200).json(items);
  });

})

app.post('/notes', function(req, res) {
  console.log('Request to add note' + JSON.stringify(req.body));

  db.notes.count().then(function(c) {
      console.log('Order: ' + c)

      req.body.date = new Date();
      req.body.order = ++c;
      db.notes.insert(req.body);
      res.end();
  }, function(err) {
    console.log(err);
    res.end();
  });



})

app.delete('/notes', function(req, res) {
  console.log('Drop note with id equal to ' + req.query.id);

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
  console.log('id: ' + req.body.id)
  var id = new ObjectID(req.body.id);
  var note = db.notes.find({_id:id}).nextObject();
  console.log('query: ' + db.notes.find().sort({order : -1}).limit(1))
  note.then(function(resp) {
    db.notes.find().sort({order : -1}).limit(1).next().then(function(item) {
      resp.order = item.order + 1;
      db.notes.update({_id: id}, {$set : {order : resp.order}});
    }), function(err) {console.log(err);}

  }, function(err) {
    console.log(err);
  });




  res.end();
});

app.listen(3000);
