users.create({
  name: "Jason Statham",
  email: "js@gmail.com",
  phone: "06202965212",
  address: "1122 Budapest Kis Utca 10",
  role: 3,
  meta: {
    birthday: new Date("1994-08-02"),
    hobby: "golf"
  }
}, function (saved) {
  console.info("Saved model:", saved);
});

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
    girlFriend: 'Kelly'
  },
  function (err, user) {
    if (err)
      console.error(err);
  });

//Első találat a feltételek alapján
users.first({
  "name": RegExp("jason", 'i')
}, function (user) {
  if (user !== null) {
    console.info("username: ", user);
  } else {
    console.info("no user!");
  }
});

// Admin visszaadása.
users.getModel().isAdmin(2, function (err, data) {
  console.log(err);
  console.log(data);
});
