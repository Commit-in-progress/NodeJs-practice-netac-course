    // Mongodb adatmodell.
    var mongoose = require("mongoose");
    // Kezeli a megadott táblát. users
    var db,
        users,
        Orders,
        models = {};

    function setConnection(mongodb) {
        db = mongodb;
        setModel();
    }

    // Kollekció modell.
    function setModel() {

        // User schema.
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
            },
        });
        userSchema.statics.isAdmin = function (r, cb) {
            return this.find({
                'role': {
                    $lte: 2
                }
            }, cb);
        };
        users = db.model('users', userSchema, 'users');

        // Order schema
//        var orderSchema = new Schema({
//
//            _creator: {type: Schema.Types.ObjectId,ref: 'users'},
//            insDate: Date,
//            description: String,
//            product: String,
//            amount: Number,
//            deadLine: Date
//        });
//        Orders = db.model('Orders', orderSchema, 'Orders');

//        var order=new Orders('Orders');
//        order.amount =10;
//        order._creator='5d037a7d8358471f0c72db5b';
//        order.save();

        models['users']=users;

    }

    function getModel(modelName) {
        if (!modelName) {
            return users;
        } else {
            return models[modelName];
        }
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
