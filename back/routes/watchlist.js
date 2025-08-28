const express = require('express');
const jwt = require('jsonwebtoken');
const WatchlistItem = require('../models/WatchlistItem');

const router = express.Router();

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // adiciona o payload do usuário (com o id) ao objeto req
    next(); // permite que a rota continue
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

// todas as rotas abaixo estão protegidas pelo "guarda"
router.get('/', authMiddleware, async (req, res) => {
  try {
    const watchlist = await WatchlistItem.find({ userId: req.user.id });
    res.json(watchlist);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { id, title, poster_path, media_type, watched, rating } = req.body;
  try {
    const newItem = new WatchlistItem({
      userId: req.user.id,
      id, title, poster_path, media_type, watched, rating
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    // se for erro de duplicata
    if (err.code === 11000) {
      return res.status(400).send('Item já está na lista.');
    }
    res.status(500).send('Erro no servidor');
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await WatchlistItem.findOneAndDelete({ userId: req.user.id, id: req.params.id });
    
    if (!result) {
      return res.status(404).json({ msg: 'Item não encontrado na lista.' });
    }
    res.json({ msg: 'Item removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedItem = await WatchlistItem.findOneAndUpdate(
      { userId: req.user.id, id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
