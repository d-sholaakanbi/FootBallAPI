require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3100;
mongoose.set('strictQuery', true)

const teamRouter = require('./routes/teamRouter')

//middleware
app.use(teamRouter);
app.use(cors());
app.use(express.json());

//error route
// app.use(notFound)
app.use((req,res) => {
    res.status(404).send(`Route not found try <a href='/api/v1/teams'>FOOTBALL API</a>`)
});


//DBconnections

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, 'localhost', ()=>{
            console.log(`listening on port ${PORT}..`);
        });
    }catch(error)  {
        console.log(error);
    }
};

startServer ();