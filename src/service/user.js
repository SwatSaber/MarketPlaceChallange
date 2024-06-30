class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
  }

  async findAll() {
    try {
      const users = await this.userRepository.findAll();
      return {
        statusCode: 200,
        listUsers: users
      };
    } catch (error) {
      return {
        statusCode: 500,
        listUsers: null,
        message: `Error fetching users: ${error.message}`
      };
    }
  }

  async create(payload) {
    try {
      // Check if user with the same email already exists
      const existingUser = await this.userRepository.getByEmail(payload.email);
      if (existingUser) {
        return {
          statusCode: 400,
          message: "Email sudah terdaftar. Silakan gunakan email lain."
        };
      }
  
      // Create a new user
      const newUser = {
        name: payload.name,
        email: payload.email,
        password: payload.password
      };
      const createdUser = await this.userRepository.create(newUser);
  
      if (createdUser) {
        return {
          statusCode: 201,
          createdUser: createdUser
        };
      } else {
        return {
          statusCode: 500,
          message: "Gagal membuat pengguna baru."
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error creating user: ${error.message}`
      };
    }
  }
  
  async login(payload) {
    try {
      const email = payload.email;
      const password = payload.password;
      
      // Validasi input email dan password
      if (typeof email !== 'string' || !email.includes('@') || typeof password  !== 'string') {
        return {
          statusCode: 400,
          message: "Invalid email or password format"
        };
      }

      const userCredential = await this.userRepository.getByEmail(email);
      if (!userCredential) {
        return {
          statusCode: 404,
          message: "Email tidak terdaftar."
        };
      }
      
      if (userCredential.password === password) {
        return {
          statusCode: 200,
          message: "Login Berhasil",
          loginedUser: userCredential
        };
      } else {
        return {
          statusCode: 400,
          message: "Email / password salah."
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error logging in: ${error.message}`
      };
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.userRepository.getByEmail(email);
  
      if (!user) {
        return {
          statusCode: 404,
          message: "User not found."
        };
      }
  
      return {
        statusCode: 200,
        user: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Error getting user by email: ${error.message}`
      };
    }
  }
}

module.exports = UserService;
