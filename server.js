const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');

mongoose.set('useFindAndModify', false);

const app = express();
const port = (process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

const userRoute = require('./routes/users.route');
app.use('/users', userRoute);

const loginRoute = require('./routes/login.route');
app.use('/', loginRoute);

const mattersRoute = require('./routes/matters.route');
app.use('/matters', auth, mattersRoute);

const accountRoute = require('./routes/account.route');
app.use('/', accountRoute);

const firmRoute = require('./routes/firm.route');
app.use('/firm', auth, firmRoute);


app.get('/', (req, res) => res.send('works!'));

// connect to mongodb
mongoose.set('useCreateIndex', true); //fixes an issue with a depricated default in Mongoose.js
mongoose
  .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to mongo...'))
  .catch(err => console.error('Could not connect to Mongo'));


app.listen(port, () => console.log(`listening on port ${port}`));
