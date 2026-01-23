const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Задержка
server.use((req, res, next) => {
  setTimeout(next, 1000);
});

// Авторизация
server.post('/auth', (req, res) => {
  const { email, password } = req.body;
  // Имитируем проверку базы данных
  if (email === 'admin@mail.ru' && password === '123') {
    return res.json({ token: 'my-secret-token' });
  }
  return res.status(401).json({ error: 'Неверный логин или пароль' });
});

// Middleware проверки токена (оставляем для других роутов)
server.use((req, res, next) => {
  if (req.path === '/auth') return next(); // Пропускаем логин

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'Bearer my-secret-token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    next();
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('✅ JSON Server is running on http://localhost:3001');
});
