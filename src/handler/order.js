class OrderHandler {
  constructor(orderService) {
    this.orderService = orderService;
    this.getByEmail = this.getByEmail.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getByEmail(req, res) {
    const email = req.params.email;
    const serviceRes = await this.orderService.getByEmail(email);

    res.status(serviceRes.statusCode).send({
      listOrders: serviceRes.listOrders,
      message: serviceRes.message || null
    });
  }

  async findAll(req, res) {
    const serviceRes = await this.orderService.findAll();
    res.status(serviceRes.statusCode).send({
      listOrders: serviceRes.listOrders,
      message: serviceRes.message || null
    });
  }

  async create(req, res) {
    const payload = req.body;
    const serviceRes = await this.orderService.create(payload);

    res.status(serviceRes.statusCode).send({
      createdOrder: serviceRes.createdOrder,
      message: serviceRes.message || null
    });
  }
}

module.exports = OrderHandler;
