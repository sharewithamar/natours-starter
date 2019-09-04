const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
  .then(() => {
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

//Always use uppercase on modelNames and modelVariables - equivalent to class
/* const testTour = new Tour({
  name: ' The Park Camper',
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => console.log('ERROR', err)); */

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//console.log(app.get('env'));
//console.log(process.env);
