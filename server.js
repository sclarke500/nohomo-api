const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = (process.env.PORT || 3000);
app.use(express.json());

const userRoute = require('./routes/users.route');
app.use('/users', userRoute);

const loginRoute = require('./routes/login.route');
app.use('/', loginRoute);

app.get('/', (req, res) => res.send('works!'));

// connect to mongodb
mongoose.set('useCreateIndex', true); //fixes an issue with a depricated default in Mongoose.js
// mongoose
//   .connect('mongodb+srv://testapp:genesis@cluster0-d3bja.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to mongo...'))
//   .catch(err => console.error('Could not connect to Mongo'));


app.listen(port, () => console.log(`listening on port ${port}`));
