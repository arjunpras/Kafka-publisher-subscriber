const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors')
const routes = require('./routes/routes.productDbAdmin');
const colors = require('colors')

const connectDB = require('./config/db')
const app = express()
app.use(express.json())
app.use(cors())

// express middleware handling the form parsing
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use('/admin', routes)

app.use('/api/admin', require("./routes/adminRoutes"))

const { errorHandler } = require("./middleware/error")

app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler)

//METHOD : GET
//TEST METHOD TO CHECK IF SERVER RESPONDS
app.get('/', (req, res) => {
    console.log("hello GET ROUTE")
    res.send("GET ROUTE WORKS")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))