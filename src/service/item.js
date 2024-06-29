class ItemService {
  constructor(itemRepository, userRepository) {
    this.itemRepository = itemRepository;
    this.userRepository = userRepository;
  }

  async findAll() {
    const items = await this.itemRepository.findAll();

    return items
  }

  async create(item) {
    const createdItem = await this.itemRepository.insert(item)

    return createdItem;
  }
}

module.exports = ItemService;























// // src/service/product.js
// class ProductService {
//   constructor(productRepository, userRepository) {
//     this.productRepository = productRepository;
//     this.userRepository = userRepository;

//     this.getAll = this.getAll.bind(this);
//     //this.getByEmail = this.getByEmail.bind(this);
//     //this.add = this.add.bind(this);
//   }

//   getAll() {
//     const product = this.productRepository.getAll();

//     return product.map(product => {
//       const user = this.userRepository.getByEmail(product.user_email);
//       return {
//         name: product.name,
//         price: product.price,
//         user: user ? { name: user.name, email: user.email } : null
//       };
//     });
//   }

//   create({ name, price, user_email }) {
//     const existingProduct = this.productRepository.getByName(name);
//     if (existingProduct) {
//       return "Product Sudah Terdaftar";
//     }

//     const newProduct = { name, price, user_email  };
//     const addedProduct = this.productRepository.create(newProduct);

//     return addedProduct;
//   }
// }


