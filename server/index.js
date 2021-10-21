const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Route Middleware
app.use('/api/user', require('./routes/users'))
app.use('/api/category', require('./routes/categories'))

app.get("/", (req, res) => {
  res.send("Hotel Application index");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  mongoose.connect(
    process.env.DB_CONNECT, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
  },
    () => console.log('Connected to db')
  );

  console.log(`Server running on port ${PORT}`)
});
