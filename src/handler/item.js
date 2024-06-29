class ItemHandler {
  constructor(itemService) {
    this.itemService = itemService;

    // Binding
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
  }

  async findAll(req, res) {
    const items = await this.itemService.findAll();

    res.status(200).send({
      items: items
    });
  }

  async create(req, res) {
    const itemToCreate = req.body;
    const createdItem = await this.itemService.create(itemToCreate);

    res.status(201).send({
      created_item: createdItem
    })
  }

  // updateById(req, res) {
  //   const itemId = req.params.id;
  // }
}

module.exports = ItemHandler;













// // src/handler/product.js
// class ProductHandler {
//   constructor(productService) {
//     this.productService = productService;

//     // Binding
//     this.create = this.create.bind(this);
//     this.getAll = this.getAll.bind(this);
//   }

//   create(req, res) {
//     const { name, price, user_email } = req.body;
//     const productCreateStatus = this.productService.create({ name, price, user_email });

//     let statusCode = 201;


//     res.status(statusCode).send({
//       registerStatus: productCreateStatus
//     });
//   }


//   getAll(req, res) {
//     const product = this.productService.getAll();

//     res.status(200).send({
//       product: product
//     });
//   }
// }

// module.exports = ProductHandler;
