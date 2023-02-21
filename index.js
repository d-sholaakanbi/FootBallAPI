require("dotenv").config();
const  express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3100;
mongoose.set('strictQuery', true)

const teamRouter = require('./routes/teamRouter')

//middleware
app.use(teamRouter);

//error route
// app.use(notFound)
app.use((req,res) => {
    res.status(404).send('Route does not exist')
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