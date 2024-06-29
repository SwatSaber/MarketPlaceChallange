class UserHandler {
  constructor(userService) {
    this.userService = userService;

    // Binding
    this.getAll = this.getAll.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async getAll(req, res) {
    const users = await this.userService.getAll();
    res.status(200).send({ users });
  }

  async getByEmail(req, res) {
    const email = req.params.email;
    const user = await this.userService.getByEmail(email);
    
    const statusCode = user ? 200 : 404;
    res.status(statusCode).send({ user });
  }

  async register(req, res) {
    const { name, email, password } = req.body;
    const newUserAccount = await this.userService.register({ name, email, password });

    if (newUserAccount === "Akun Sudah Terdaftar") {
      return res.status(401).send({ error: "Akun Sudah Terdaftar" });
    }

    res.status(201).send({ message: "Berhasil Registrasi", newUserAccount });
  }

  async login(req, res) {
    const { email, password } = req.body;

    // Validasi input email dan password
    if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string' || password.length < 6) {
      return res.status(400).send({ error: 'Invalid email or password format' });
    }

    const userAccount = await this.userService.login({ email, password });

    if (userAccount === "Email Tidak Terdaftar") {
      return res.status(401).send({ error: "Email Tidak Terdaftar" });
    }

    if (userAccount === "Email / Password Salah") {
      return res.status(401).send({ error: userAccount });
    }

    res.status(200).send({ message: "Berhasil Login", userAccount });
  }
}

module.exports = UserHandler;
