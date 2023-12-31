const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/user');
const authRoute = require('./routes/Auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');


mongoose.connect(process.env.DB)
    .then(() => console.log('connected....'))
  .catch((err) => console.log(err));
    
app.use(express.json());
app.use('/api', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.use('./api/cart', cartRoute);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));