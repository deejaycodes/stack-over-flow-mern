const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const connectDB = require('./config/db');

//Load config
dotenv.config({path: './config/config.env'});

connectDB();

//const pool = require('../config/db.config');
//const index = require('./server/routes/index.route');
const app = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// cors enable
app.options('*', cors());
app.use(cors({origin: 'http://localhost:5000'}));

// security config
app.use(helmet());

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// database connection
// pool.query(`USE ${process.env.DATABASE}`);
// global.pool = pool;
app.use('/auth', authRoutes);
app.use('/users', auth, usersRoutes);
// connection with client setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// all the api routes
//app.use('/api', index);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
