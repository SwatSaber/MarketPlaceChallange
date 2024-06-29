class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.getAll = this.getAll.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async register({ name, email, password }) {
    const existingUser = await this.userRepository.getByEmail(email);
    
    if (existingUser) {
      return "Akun Sudah Terdaftar";
    }

    const newUser = { name, email, password };
    const registrationResult = await this.userRepository.insert(newUser);
    
    if (registrationResult) {
      return registrationResult;
    }

    return "Registrasi Gagal";
  }

  async login({ email, password }) {
    const userCredential = await this.userRepository.getByEmail(email);
    
    if (!userCredential) {
      return "Email Tidak Terdaftar";
    }

    if (userCredential.password === password) {
      return userCredential;
    } else {
      return "Email / Password Salah";
    }
  }
}

module.exports = UserService;
