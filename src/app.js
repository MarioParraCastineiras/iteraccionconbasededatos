const express = require('express');

const authRoutes = require('./routes/authRoutes');
const studioRoutes = require('./routes/studioRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/studios', studioRoutes);
app.use('/api/games', gameRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
