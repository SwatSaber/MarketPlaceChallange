const { Item, User } = require('../../models')

class ItemRepository {
  constructor() { }

  async findAll() {
    const itemList = await Item.findAll();

    return itemList;
  }

  async insert(item) {
    const createdItem = await Item.create({
      name: item.name,
      price: item.price,
      description: item.description,
      userId: item.userId
    });

    return createdItem;
  }

  async updateItem(itemId, updatedFields) {
    const [updated] = await Item.update(updatedFields, {
      where: { id: itemId }
    });
    if (updated) {
      const updatedItem = await this.getById(itemId);
      return updatedItem;
    }
    
  }

  async getById(itemId) {
    const item = await Item.findOne({
      where: { id: itemId }
    });
    return item;
  }

  async getByName(name) {
    const item = await Item.findOne({
      where: { name: name }
    });
    return item;
  }


  async getByEmail(email) {
    const itemLists = await Item.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          where: { email: email }, // Menyertakan kondisi untuk email pengguna
          required: true, // Menggunakan inner join agar hanya mengambil item yang memiliki pengguna terkait
          as: "user",
        },
      ]
    });
    return itemLists;
  }
}
module.exports = ItemRepository;