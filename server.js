// Beolvassuk a szükséges csomagokat.
var express = require("express");
var fs = require('fs');
var mongoose = require('mongoose');

// Kapcsolódás az adatbázishoz (mongoDb)
mongoose.connect('mongodb://localhost/NodeJs-practice-netac-course', {
  useNewUrlParser: true
});

// users tábla model.
var models = {};
models.users = require('./models/users');
models.users.setConnection(mongoose);


// Globális változók.
var port = 3500;
var staticDir = 'build';

// Létrehozunk egy express szerver példányt.
var app = express();
app.set('view engine', 'pug')
app.set('views', './src/view');


// Statikus fájlok.
app.use(express.static(staticDir));

app.use('/:model/:id*?', function (req, res, next) {

    if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
      console.log(req.method);
      switch (req.method.toLowerCase()) {
        case 'get':
          models[req.params.model].getModel().find({}, function (err, data) {
            res.send(
              JSON.stringify(data));
          });
          break;
        case 'post':
          // Adatcsomagok fogadása
          var requestBody = '';
          req.on("data", function (package) {
            requestBody += package;
          });
          req.on("end", function () {
            requestBody = JSON.parse(requestBody);
            var newData = {};
            for (var k in requestBody) {
              if (k == '_id') {
                continue;
              }
              newData[k] = requestBody[k];
            }
            models[req.params.model].getModel().updateOne({
                _id: requestBody._id
              }, newData,
              function (err, user) {
                res.send('{"succes": "true}');
              });
          });
          break;
        case 'delete':
          if (req.params.id) {
            var where = {_id:req.params.id};
            models[req.params.model].getModel().remove(where,function(err, rem) {
              if (err) console.error(err);
              res.send('{"succes": "true"}');
            });
          }else {
              res.send('{"error": "no id"}');
            }
    break;
    default:
    res.send('{"error": "unsupported method}');
  }
}
else {
  next();
}
});

// Definiáljuk a szerver működését.
app.get('/', function (req, res) {
  handleusers(req, res, false, function (allusers) {
    res.render('index', {
      title: 'Pug practice',
      message: 'Szép nap van',
      users: allusers
    });
  });
});

// Felhasználó modell.
function handleusers(req, res, next, callBack) {
  fs.readFile('./users.json', 'utf8', function (err, data) {
    if (err) throw err;

    //var path=req.url.split('/');
    var users = JSON.parse(data);

    if (callBack) {
      callBack(users);
      return;
    }
    var _user = {};

    //ha nem kaptunk id-t
    if (!req.params.id) {
      _user = users;
    } else {
      for (var k in users) {
        if (req.params.id == users[k].id) {
          _user = users[k];
        }
      }
    }
    res.send(JSON.stringify(_user));
  });
}
// Felhasználók beolvasása.
app.get('/users/:id*?', function (req, res) {
  console.log(req.url);
  handleusers(req, res);
});

// Megadjuk, hogy a szerver melyik portot figyelje.
app.listen(port);
console.log("Server running in localhost:" + port);
