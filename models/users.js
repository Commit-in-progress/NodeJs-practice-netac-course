    // Mongodb adatmodell.
    var mongoose = require("mongoose");
    // Kezeli a megadott táblát. users
    var db,
        users;

    function setConnection(mongodb) {
        db = mongodb;
        setModel();
    }

    // Kollekció modell.
    function setModel() {
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            name: String,
            email: String,
            phone: String,
            address: String,
            role: Number,
            meta: {
                birthday: Date,
                hobby: String,
            }
        });
        userSchema.statics.isAdmin = function (r, cb) {
            return this.find({'role': {$lte: 2}},cb);
        };
        users = db.model('users',userSchema ,'users');
    }
function getModel(){
    return users;
}
    //Adatok olvasása a kollekcióból(táblából).
    function read(where, callBack) {
        //Paraméter vizsgálata.
        if (!where) {
            where = {};
        }

        // Adatbázis olvasása.
        users.find(where, function (err, data) {
            if (err) {
                console.error('Error in query:', where);
                data = [];
            }
            if (callBack) {
                callBack(data);
            }
        });
    }
    //Egy dokumentum lekérése
    function first(where, callBack) {
        read(where, function (data) {
            if (data.length > 0) {
                callBack(data[0]);
            } else {
                callBack(null);
            }
        });
    }


    //Új dokumentum beszúrása az adatbázisba
    function create(document, callBack) {
        var user = new users(document);
        user.save(function (err) {
            if (err) {
                console.error("Save error: ", err);
                callBack({});
            } else {
                callBack(user);
            }
        });
    }

    // Publikus elemek.
    module.exports = {
        setConnection: setConnection,
        read: read,
        create: create,
        first: first,
        getModel: getModel
    };
