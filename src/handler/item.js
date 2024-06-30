class ItemHandler {
  constructor(itemService) {
    this.itemService = itemService;

    // Binding
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
  }

  async findAll(req, res) {
    const serviceRes = await this.itemService.findAll();

    res.status(serviceRes.statusCode).send({
      listItems: serviceRes.listItems
    })
  }

  async getByEmail(req, res) {
    const email = req.params.email;
    const serviceRes = await this.itemService.getByEmail(email);
    
    res.status(serviceRes.statusCode).send({
      listItems: serviceRes.listItems
    })
  }

  async create(req, res) {
    const payload = req.body;
    const serviceRes = await this.itemService.create(payload);

    res.status(serviceRes.statusCode).send({
      createdItem: serviceRes.createdItem
    })
  }

  async update(req, res) {
    const payload = req.body;
    const serviceRes = await this.itemService.update(payload)

    res.status(serviceRes.statusCode).send({
      updatedItem: serviceRes.updatedItem
    })
  }


}

module.exports = ItemHandler;

