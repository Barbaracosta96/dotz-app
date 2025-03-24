// backend/index.js
const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware para simular a criptografia de senhas
server.post('/usuarios', async (req, res, next) => {
  const { email, senha, ...userData } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // Gere um salt
    const salt = await bcrypt.genSalt(10);

    // Hashe a senha com o salt
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Substitua a senha original pela senha hasheada
    req.body.senha = hashedPassword;

    // Continua com a criação do usuário com a senha hasheada
    next();
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Middleware para simular a validação da senha no login
server.get('/usuarios', async (req, res, next) => {
  if (req.query.email && req.query.senha) {
    const { email, senha } = req.query;

    const user = router.db.get('usuarios').find({ email }).value();

    if (user) {
      // Compare a senha fornecida com a senha hasheada armazenada
      const passwordMatch = await bcrypt.compare(senha, user.senha);

      if (passwordMatch) {
        // Retorna o usuário (sem a senha) se a senha corresponder
        const { senha, ...userWithoutPassword } = user;
        return res.json([userWithoutPassword]);
      } else {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  }

  // Se não for uma requisição de login, continua com o fluxo normal
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});