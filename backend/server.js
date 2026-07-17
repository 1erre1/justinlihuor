const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/bingelist';

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
    // priority: { type: String, default: 'Normal' }
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

app.get('/', (req, res) => {
  res.json({ message: 'BingeList API is running' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', app: 'BingeList' });
});

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Could not load movies' });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    if (!req.body || !req.body.title || req.body.title.trim() === '') {
      return res.status(400).json({ error: 'Title is required'});
    }

    const movie = await Movie.create({
      title: req.body.title.trim(),
      completed: Boolean(req.body.completed)
      // priority: req.body.priority || 'Normal'
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Could not add movie' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    // If the movie is not found, return a 404 error
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found'});
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Invalid movie ID'});
  }
})

app.put('/api/movies/:id', async (req, res) => {
  try {
    const updates = {};

    if (typeof req.body.title === 'string') {
      if (req.body.title.trim() === '') {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      updates.title = req.body.title.trim();
    }
    if (typeof req.body.completed === 'boolean') {
      updates.completed = req.body.completed;
    }
    if (typeof req.body.priority === 'string') {
      updates.priority = req.body.priority;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Invalid movie id or data' });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Moviw deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid movie id' });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB")

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed', err.message);
  }
}

startServer();
