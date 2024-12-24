const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// mongoose.connect('mongodb://localhost:27017/userdb' );
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: String,
  password: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kullanıcıları al
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Yeni kullanıcı ekle
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });

    if (user) {
      const role = user.role !== 'admin' ? 'user' : user.role;
      res.json({ success: true, role, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// Kullanıcı adı kontrol et
app.get('/users/check/:name', async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  if (user) {
    res.json({ available: false });
  } else {
    res.json({ available: true });
  }
});

// Kullanıcıyı güncelle
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Kullanıcıyı sil
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Statik dosyaları sun
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});