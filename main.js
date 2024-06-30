const express = require('express');
const path = require('path');
const app = express();
const PORT =4000;

// Import dependencies
const UserRepository = require('./src/repository/user');
const ItemRepository = require('./src/repository/item');
const OrderRepository = require('./src/repository/order');
const UserService = require('./src/service/user');
const ItemService = require('./src/service/item');
const OrderService = require('./src/service/order');
const UserHandler = require('./src/handler/user');
const ItemHandler = require('./src/handler/item');
const OrderHandler = require('./src/handler/order');
const logger = require('./src/middleware/logger');
const internalServerErrorHandler = require('./src/middleware/internalServerError');

// Middleware setup
app.use(express.json());
app.use(logger);
app.use(express.static('public'));

// User setup
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

// User endpoints
app.get('/user/:email', userHandler.getByEmail);
app.get('/users/list', userHandler.findAll);
app.post('/user/login', userHandler.login);
app.post('/user/register', userHandler.create);

// Item setup
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository, userRepository);
const itemHandler = new ItemHandler(itemService);

// Item endpoints
app.get('/items/:email', itemHandler.getByEmail);
app.get('/items/list', itemHandler.findAll);
app.post('/item/register', itemHandler.create);
app.post('/item/update', itemHandler.update);

//Order setup
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, itemRepository, userRepository);
const orderHandler = new OrderHandler(orderService);

// Order endpoints
// app.get('/orders/:email', orderHandler.getByEmail);
app.get('/orders/list', orderHandler.findAll);
app.post('/order/register', orderHandler.create);


// Test router
const testRouter = express.Router();
testRouter.use((req, res, next) => {
  console.log("Middleware khusus endpoint testing");
  next();
});
testRouter.get('/testing', (req, res) => {
  res.send('Ini data testing pertama');
});
app.use(testRouter);

// Error handling
app.use(internalServerErrorHandler);
app.use((req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: "not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
