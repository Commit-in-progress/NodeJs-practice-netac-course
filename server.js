// Beolvassuk a szükséges csomagokat.
var express = require("express");
var fs = require("fs");
var mongoose = require('mongoose');

// Kapcsolódás az adatbázishoz (mongoDb)
mongoose.connect('mongodb://localhost/NodeJs-practice-netac-course', {
  useNewUrlParser: true
});

// users tábla model.
var users = require('./models/users');
users.setConnection(mongoose);
/*users.create({
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    phone: "06202965212",
    address: "1122 Budapest Kis Utca 10",
    role: 3,
    meta: {
        birthday: new Date("1994-08-02"),
        hobby: "golf",
    }
}, function (saved) {
    console.info("Saved model:", saved);
});*/

//Dokumentum törlése
users.getModel().deleteOne({
  'name': new RegExp('jack', 'i')
}, function (err, rem) {
  if (err)
    console.error(err);
  else {
    console.log(rem.result);
  }
})

//Dokumentum frissítése.
users.getModel().updateOne({
    name: new RegExp('jason', 'i')
  }, {
    girlFriend: 'Kelly Rose'
  },
  function (err, user) {
    if (err)
      console.error(err);
  });

//Első találat a feltételek alapján
users.first({
  "name": RegExp("jason", 'gi')
}, function (users) {
  if (users !== null) {
    console.info("username: ", users);
  } else {
    console.info("no user!");
  }
});

// Admin visszaadása.
users.getModel().isAdmin(2, function (err, data) {
  console.log(err);
  console.log(data);
});

// Globális változók.
var port = 3500;
var staticDir = 'build/';

// Létrehozunk egy express példányt.
var app = express();
app.set('view engine', 'pug')
app.set('views', './src/view');


// Statikus fájlok.
app.use(express.static(staticDir));

app.use(function (req, res, next) {

  console.log(req.headers);

  if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
    res.send(JSON.stringify({
      'hello': 'world'
    }));
  } else {
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
