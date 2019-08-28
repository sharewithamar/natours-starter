const mongoose = require('mongoose');
const dotenv = require('dotenv');
/** config files should be read first before requiring app */
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const app = require('./app');

/**connecting to remote DB */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(con => {
    //console.log(con.connections);
    console.log('DB connection successful');
  });

/**connect to local DB  */
/* mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(con => {
    //console.log(con.connections);
    console.log('DB connection successful');
  });
 */

// schema type options are optional. you can define simply name: String too
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, ' A tour must have a price']
  }
});

//Always use uppercase on modelNames and modelVariables - equivalent to class
const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: ' The Park Camper',
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => console.log('ERROR', err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//console.log(app.get('env'));
//console.log(process.env);
