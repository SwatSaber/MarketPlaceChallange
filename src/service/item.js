class ItemService {
  constructor(itemRepository, userRepository) {
    this.itemRepository = itemRepository;
    this.userRepository = userRepository;
    this.getByEmail = this.getByEmail.bind(this);
  }

  async findAll() {
    try {
      const items = await this.itemRepository.findAll();
      return {
        statusCode: 200,
        listItems: items
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
      const createdItem = await this.itemRepository.insert(payload);
      return {
        statusCode: 201,
        createdItem: createdItem
      };
    } catch (error) {
      return {
        statusCode: 500,
        createdItem: null,
        message: `Error creating item: ${error.message}`
      };
    }
  }

  async update(payload) {
    try {
      const itemId = payload.itemId;
      const updateFields = {
        name: payload.name,
        price: payload.price,
        description: payload.description
      };

      const updatedItem = await this.itemRepository.updateItem(itemId, updateFields);
      return {
        statusCode: 200,
        updatedItem: updatedItem
      };
    } catch (error) {
      return {
        statusCode: 500,
        updatedItem: null,
        message: `Error updating item: ${error.message}`
      };
    }
  }

  async getByEmail(email) {
    try {
      const listItems = await this.itemRepository.getByEmail(email);
      return {
        statusCode: 200,
        listItems: listItems
      };
    } catch (error) {
      return {
        statusCode: 500,
        listItem: null,
        message: `Error updating item: ${error.message}`
      };
    }
  }
}

module.exports = ItemService;
