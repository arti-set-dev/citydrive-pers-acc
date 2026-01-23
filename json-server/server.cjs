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
  
  // 1. Получаем список сотрудников из вашей БД (db.json)
  const db = router.db; // если это json-server
  const employees = db.get('employees').value();

  // 2. Ищем пользователя с таким email и паролем
  // Примечание: в реальной БД пароль должен быть зашифрован
  const user = employees.find(
    (emp) => emp.email === email && password === '123' // пароль пока оставим статичным для теста
  );

  if (user) {
    // 3. Возвращаем токен И все данные найденного пользователя
    return res.json({
      ...user,
      token: 'my-secret-token'
    });
  }

  return res.status(401).json({ error: 'Пользователь не найден или пароль неверен' });
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
