const { Order, Item, User } = require('../../models')

class OrderRepository {
  constructor() { }

  async findAll() {
    const orderList = await Order.findAll();
    return orderList;
  }


  async create(newOrder) {
    const createdOrder = await Order.create({
        userId: newOrder.userId,
        itemId: newOrder.itemId,
        quantity: newOrder.quantity,
    });
    const orderWithDetails = await Order.findOne({
      where: { id: createdOrder.id },
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          as: 'user',
        },
        {
          model: Item,
          attributes: ['name'],
          as: 'item',
        }
      ]
    });
    return orderWithDetails;
  }

  async getByEmail(email) {
    const orderLists = await Order.findAll({
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
            where: { email: email }, // Menyertakan kondisi untuk email pengguna
            required: true, // Menggunakan inner join agar hanya mengambil item yang memiliki pengguna terkait
            as: "user",
          },
          {
            model: Item,
            attributes: ['name', 'price', 'description'],
            required: true, // Menggunakan inner join agar hanya mengambil item yang memiliki order terkait
            as: "item",
          }
        ]
      });
    return orderLists;;
  }

}

module.exports = OrderRepository;