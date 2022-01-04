var express = require('express');
// var document = require('document');
var alert = require('alert');
const webpush = require('web-push');
var session = require('express-session');
// var document = require('document');
var path = require('path');
var fs = require('fs');
var MongoStore = require('connect-mongo');
const { json } = require('express');
const { url } = require('inspector');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var { MongoClient } = require('mongodb');
var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var { MongoClient } = require('mongodb');
var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: uri,
    autoRemove: 'native',
    ttl: 60 * 60
  })
}));

var session_index;
var data = fs.readFileSync("users.json");
var z;
async function register() {

  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });

  await client.connect();
  await client.db('networksdb').createCollection("cart");
  await client.db('networksdb').collection('secondCollection').insertOne(z);

  client.close();
}
var output = [];
var empty = [];
var x;
var y;
var Id;
var flag = 0;
var index = -1;
var itemName = "empty";
var userCart = [];

app.get('/', function (req, res) {
  res.render('login')
});


app.post('/', function (req, res) {
  x = req.body.username;
  y = req.body.password;
  var z = JSON.parse(data);

  async function login() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
    await client.connect();

    output = await client.db('networksdb').collection('secondCollection').find().toArray();
    for (let i = 0; i < output.length; i++) {
      if (output[i].username == x && output[i].password == y) {
        flag = 1;
        index = i;
        userCart = output[i].Cart;

        req.session.username = x;
        output[i].id = Id;
        res.redirect('/home');
        res.end()
        break;
      }
    }
    if (flag == 0) {
      alert('wrong username or password');
      res.redirect('/');
    }
    flag = 0;
    client.close();
  }
  login().catch(console.error);



});


app.get('/registration', function (req, res) {
  res.render('registration')
});

app.post('/register', function (req, res) {
  x = req.body.username;
  y = req.body.password;
  var cart = [];

  z = { username: x, password: y, Cart: cart, id: req._id };

  async function register() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });

    await client.connect();

    output = await client.db('networksdb').collection('secondCollection').find().toArray();

    for (let i = 0; i < output.length; i++) {

      if (output[i].username == x) {
        flag = 0;
        alert('username is taken');
        res.redirect('/registration');
        break;
      }
      else if (x == "") {
        flag = 0;
        alert('please enter a username');
        res.redirect('/registration');
        break;
      }
      else if (y == "") {
        flag = 0;
        alert('please enter a password');
        res.redirect('/registration');
      }
      else
        flag = 1;
    }

    if (flag == 1 || output.length == 0) {
      await client.db('networksdb').collection('secondCollection').insertOne(z);
      req.session.username = x;
      res.redirect('/home');

      index = output.length + 1;
      flag = 0;
    }


    client.close();
  }

  register().catch(console.error);
});


app.post('/emptycart', function (req, res) {

  async function emptyCart() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
    await client.connect();
    await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: empty } });
    client.close();
  }
  emptyCart().catch(console.error);
});
var cartFlag = true;






app.get('/home', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('home')
});

app.get('/phones', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('phones')
});

app.get('/iphone', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else

    res.render('iphone')

});

app.get('/galaxy', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('galaxy')

});

app.get('/books', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('books')
});

app.get('/leaves', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('leaves')
});

app.get('/sun', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('sun')
});

app.get('/sports', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('sports')
});

app.get('/boxing', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('boxing')

});

app.get('/tennis', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/')
  }
  else
    res.render('tennis')
});



var searchItem = "";
var picItem = "";

var items = ["the sun and her flowers", "iphone 13 pro", "samsung galaxy s21 ultra", "boxing bag", "tennis racket", "leaves of grass"];
var results = [];
var paint = [];
app.post('/search', function (req, res) {
  if (req.body.Search.length != 0) {
    

    for (var i = 0; i < items.length; i++) {
      if (items[i].includes(req.body.Search)) {
        results.push(items[i]);
      }
    }
  }


  if (results.length > 0) {

    for (var i = 0; i < results.length; i++) {
      switch (results[i]) {
        case 'boxing bag': searchItem = "boxing"; paint.push({ name: "boxing bag", url: "/boxing", image: "boxing.jpg" }); break;
        case 'samsung galaxy s21 ultra': searchItem = "galaxy"; paint.push({ name: "samsung galaxy s21 ultra", url: "/galaxy", image: "galaxy.jpg" }); break;
        case 'iphone 13 pro': searchItem = "iphone"; paint.push({ name: "iphone 13 pro", url: "/iphone", image: "iphone.jpg" }); break;
        case 'leaves of grass': searchItem = "leaves"; paint.push({ name: "leaves of grass", url: "/leaves", image: "leaves.jpg" }); break;
        case 'the sun and her flowers': searchItem = "sun"; paint.push({ name: "the sun and her flowers", url: "/sun", image: "sun.jpg" }); break;
        case 'tennis racket': searchItem = "tennis"; paint.push({ name: "tennis racket", url: "/tennis", image: "tennis.jpg" }); break;

      }
    }
    res.render('searchresults', { paint: (paint) });
  }
  else {
    alert('item not found');
  }
  paint = [];




  results = [];
});



app.post('/itemRedirect', function (req, res) {
  res.render(searchItem);
});

app.get('/cart', function (req, res) {
  async function getCart() {
    var { MongoClient } = require('mongodb');
    var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
    await client.connect();
    await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
    client.close();
  }
  res.render('cart', { cart: userCart });

  req.body.cart = "userCart";
  getCart().catch(console.error);

});

app.post('/galaxy', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }

  for (var i = 0; i <= userCart.length; i++) {
    if (userCart[i] == 'samsung galaxy') {
      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {
    userCart.push('samsung galaxy');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('galaxy');
  cartFlag = true;

});

app.post('/iphone', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }

  for (var i = 0; i <= userCart.length; i++) {
    if (userCart[i] == 'iphone 13') {
      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {
    userCart.push('iphone 13');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('iphone');
  cartFlag = true;

});

app.post('/sunBook', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }
  client.close();

  for (var i = 0; i < userCart.length; i++) {
    if (userCart[i] == 'sun book') {

      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {

    userCart.push('sun book');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('sun');
  cartFlag = true;

});

app.post('/tennis_racket', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }

  for (var i = 0; i <= userCart.length; i++) {
    if (userCart[i] == 'tennis racket') {
      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {
    userCart.push('tennis racket');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('tennis');
  cartFlag = true;

});

app.post('/boxing_bag', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }

  for (var i = 0; i <= userCart.length; i++) {
    if (userCart[i] == 'boxing bag') {
      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {
    userCart.push('boxing bag');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('boxing');
  cartFlag = true;

});

app.get('/searchresults', function (req, res) {

  res.render('searchresults')
})

app.post('/leaves_book', async function (req, res) {

  var { MongoClient } = require('mongodb');
  var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
  await client.connect();
  output = await client.db('networksdb').collection('secondCollection').find().toArray();
  for (let i = 0; i < output.length; i++) {
    if (output[i].username == req.session.username) {
      userCart = output[i].Cart;
      break;
    }
  }

  for (var i = 0; i <= userCart.length; i++) {
    if (userCart[i] == 'leaves book') {
      alert('item is already in the cart');
      cartFlag = false;
      break;
    }
  }

  if (cartFlag == true) {
    userCart.push('leaves book');
    async function addCart() {
      var { MongoClient } = require('mongodb');
      var uri = "mongodb+srv://Database:MindGame28@database2131.dqleo.mongodb.net/networksdb?retryWrites=true&w=majority"
      var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedtopology: true });
      await client.connect();
      await client.db('networksdb').collection('secondCollection').updateOne({ username: req.session.username }, { $set: { Cart: userCart } });
      client.close();
    }
    addCart().catch(console.error);
  }
  res.render('leaves');
  cartFlag = true;

});
// config.assets.compress = true
// app.listen(3000);
if (process.env.PORT) {
  app.listen(process.env.PORT, function () { console.log('server started') });
} else {
  app.listen(3000, function () { });
}

module.exports = app;
// shahsa
// heroku open