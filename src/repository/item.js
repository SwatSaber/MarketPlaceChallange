const { Item } = require('../../models')

class ItemRepository {
  constructor() { }

  async findAll() {
    const itemList = await Item.findAll();

    return itemList;
  }

  async insert(item) {
    const createdUser = await Item.create({
      name: item.name,
      email: user.email,
      password: user.password
    });

    return createdUser;
  }

  async getByEmail(email) { }
}

module.exports = ItemRepository;