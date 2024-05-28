const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SensorModel = require('./Sensor');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hydro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res)=>{
  SensorModel.find()
      .then(sensors=> res.json(sensors))
      .catch(err=> console.json(err))
})

app.get('/latest', (req, res) => {
  SensorModel.findOne().sort({ time: -1 })
    .then(sensor => res.json(sensor))
    .catch(err => res.status(500).json('Error: ' + err));
});


// Route to store pH data
app.post('/adddata', async (req, res) => {
  const { ph, light } = req.body;

  const sensorData = {
    ph: parseFloat(ph),
    light: parseFloat(light),
    time: new Date(), // Store the current date and time
  };

  SensorModel.create(sensorData)
    .then(sensor => res.json(sensor))
    .catch(err => res.status(500).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
