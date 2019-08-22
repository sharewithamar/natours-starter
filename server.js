const dotenv = require('dotenv');
/** config files should be read first before requiring app */
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//console.log(app.get('env'));
//console.log(process.env);
