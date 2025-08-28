const mongoose = require('mongoose');

const WatchlistItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // referencia ao usuario dono do item
  id: { type: Number, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  media_type: { type: String, required: true },
  watched: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
});

//garante que um usuário não possa adicionar o mesmo item duas vezes
WatchlistItemSchema.index({ userId: 1, id: 1 }, { unique: true });

module.exports = mongoose.model('WatchlistItem', WatchlistItemSchema);