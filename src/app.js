require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadRoutes = require('./routes/lead.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'PrimeTrix Lead System is running',
    version: '1.0.0',
    endpoints: {
      POST:  '/api/leads       — Create new lead',
      GET:   '/api/leads       — Fetch all leads',
      GETID: '/api/leads/:id   — Fetch single lead',
      PATCH: '/api/leads/:id   — Update lead status',
    }
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
