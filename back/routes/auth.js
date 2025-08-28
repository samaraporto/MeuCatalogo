const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // verifica se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilizador já existe' });
    }

    // cria um novo usuário
    user = new User({ email, password });

    // criptografa a senha 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // salva o usuário no banco de dados
    await user.save();

    res.status(201).send('Utilizador registado com sucesso');

  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // compara a senha enviada com o hash guardado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // se a senha estiver correta, cria o token JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // um "segredo" para assinar o token
      { expiresIn: '5h' }, // O token expira em 5 horas
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // envia o token para o frontend
      }
    );

  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
