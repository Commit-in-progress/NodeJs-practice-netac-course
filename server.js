// Beolvassuk a szükséges csomagokat.
var express = require("express");
var fs = require("fs");
var itf = require('./my_modules/itf_module');

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
    res.render('index', {
        title: 'Pug practice',
        message: 'Szép nap van'
    })
});

// Felhasználó modell.
function handleUsers(req, res) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;

        //var path=req.url.split('/');
        var users = JSON.parse(data);
        var _user = {};
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
    handleUsers(req, res);
});

// Megadjuk, hogy a szerver melyik portot figyelje.
app.listen(port);
console.log("Server running in localhost:" + port);
