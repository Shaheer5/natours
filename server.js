const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './global.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) =>
    console.log(db.connections[0].name + ' database connected successfully'),
  );

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app running on port: ' + port);
});
