class OrderService {
  constructor(orderRepository, itemRepository, userRepository) {
    this.orderRepository = orderRepository;
    this.itemRepository = itemRepository;
    this.userRepository = userRepository;
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
  }

  async findAll() {
    try {
      const orders = await this.orderRepository.findAll();
      return {
        statusCode: 200,
        listOrders: orders
      };
    } catch (error) {
      return {
        statusCode: 500,
        allItems: null,
        message: `Error fetching items: ${error.message}`
      };
    }
  }

  async create(payload) {
    try {
      const email = payload.email;
      const itemName = payload.name;
      const quantity = payload.quantity;

      // Validasi input
      if (!email || !itemName || !quantity) {
        return {
          statusCode: 400,
          message: "Invalid input: email, name, and quantity are required"
        };
      }

      // Mendapatkan user berdasarkan email
      const userAccount = await this.userRepository.getByEmail(email);
      if (!userAccount) {
        return {
          statusCode: 404,
          message: "User not found"
        };
      }

      // Mendapatkan item berdasarkan nama
      const itemAccount = await this.itemRepository.getByName(itemName);
      if (!itemAccount) {
        return {
          statusCode: 404,
          message: "Item not found"
        };
      }

      // Membuat order baru
      const newOrder = {
        userId: userAccount.id,
        itemId: itemAccount.id,
        quantity: quantity
      };

      // Mendaftarkan order baru
      const registrationResult = await this.orderRepository.create(newOrder);
      if (registrationResult) {
        return {
          statusCode: 201,
          createdOrder: registrationResult
        };
      } else {
        return {
          statusCode: 500,
          message: "Failed to create order"
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error creating order: ${error.message}`
      };
    }
  }

  async getByEmail(email) {
    try {
      const listOrders = await this.orderRepository.getByEmail(email);
      if (!listOrders.length) {
        return {
          statusCode: 404,
          listOrders: [],
          message: "No orders found for this user."
        };
      }
      return {
        statusCode: 200,
        listOrders: listOrders
      };
    } catch (error) {
      return {
        statusCode: 500,
        listOrders: null,
        message: `Error fetching orders: ${error.message}`
      };
    }
  }

}

module.exports = OrderService;
