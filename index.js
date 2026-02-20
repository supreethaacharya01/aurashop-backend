const express =require('express');
require('dotenv').config()

const app = express();

const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

const ConnectToMongo = require('./db');


// connect to DB
ConnectToMongo();

// start server
const portnum = process.env.PORT;
app.listen(portnum, () => {
    console.log("server is running on the portnumber: " + portnum);
});

app.use('/api/image/', express.static("./Uploads"))

// routes
app.use('/api/user', require('./Routes/UserRoutes'));
app.use('/api/product', require("./Routes/ProductRoute"))
app.use('/api/category', require("./Routes/CategoryRoute"))
app.use('/api/cart', require('./Routes/CartRoute'))
app.use('/api/order', require('./Routes/OrderRoute'))

// ✅ ADD THIS: Protect admin routes (if you have admin API routes)
// app.use('/api/admin', authuser, isAdmin, require('./Routes/AdminRoutes'));




