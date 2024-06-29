const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

/// Import dependecy
// Import repository
const UserRepository = require('./src/repository/user');
const ItemRepository = require('./src/repository/item');

// Import service
const UserService = require('./src/service/user');
const ItemService = require('./src/service/item');

// Import handler
const UserHandler = require('./src/handler/user');
const ItemHandler = require('./src/handler/item');

// Import middleware
const logger = require('./src/middleware/logger');
const internalServerErrorHandler = require('./src/middleware/internalServerError')

app.use(express.json());
app.use(logger);
app.use(express.static('public'));

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

// Endpoint untuk show images
app.get('/images/binar.png', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/binar.png'));
})

app.get('/users/:email', userHandler.getByEmail);

// TODO: 
app.get('/users', userHandler.getAll);
app.post('/login', userHandler.login);
app.post('/register', userHandler.register);

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository, userRepository);
const itemHandler = new ItemHandler(itemService);


app.get('/items', itemHandler.findAll);
app.post('/items', itemHandler.create);
// app.delete('/products/:id') // http://localhost:8000/products/1
// app.put('/products/:id')

// app.get('/categories', productHandler.getAll);
// app.post('/categories', productHandler.create);
// app.delete('/categories/:id') // http://localhost:8000/categories/1
// app.put('/categories/:id')

app.get('/codingan-error', (req, res) => {
  res.send(dataUser);
})

const testRouter = express.Router();

testRouter.use((req, res, next) => {
  console.log("ini middleware khusus endpoint testing");

  next();
})

testRouter.get('/testing', (req, res) => {
  res.send('ini data testing pertama');
})

app.use(testRouter);

app.use(internalServerErrorHandler);
app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found"
  })
});

app.listen(PORT, function () {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});

// TODO:
// app.get('/categories', productHandler.getAll);
// app.post('/categories', productHandler.create);

// Arsitektur Backend NodeJS
// 3 layers:
// 1. Handler
// 2. Service
// 3. Repository