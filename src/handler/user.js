class UserHandler {
  constructor(userService) {
    this.userService = userService;

    // Binding
    this.findAll = this.findAll.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
    this.login = this.login.bind(this);
    this.create = this.create.bind(this);
  }

  async findAll(req, res) {
    const serviceRes = await this.userService.findAll();
    res.status(serviceRes.statusCode).send({
      listUsers: serviceRes.listUsers
    })
  }

  async getByEmail(req, res) {
    const email = req.params.email;
    const user = await this.userService.getByEmail(email);
    
    const statusCode = user ? 200 : 404;
    res.status(statusCode).send({ user });
  }

  async create(req, res) {
    const payload = await req.body;
    const serviceRes = await this.userService.create(payload);

    res.status(serviceRes.statusCode).send({
      createdUser: serviceRes.createdUser,
      message: serviceRes.message
    });
  }

  async login(req, res) {
    const payload = await req.body;
    const serviceRes = await this.userService.login(payload);
    
    res.status(serviceRes.statusCode).send({
      loginedUser: serviceRes.loginedUser,
      message: serviceRes.message
    });
  }
}

module.exports = UserHandler;
