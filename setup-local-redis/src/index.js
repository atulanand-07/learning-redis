import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const PORT = 5000

app.use(express.json());

app.get("/redis", async(req, res) => {
    const reply = await redis.ping();
    res.json({redis: reply});
})

app.get("/mongo", async(req, res) => {
    const url = process.env.MONGO_URL || 'mongo://localhost:27017/backend-with-redis';

    if(mongoose.connect.readyState === 0){
        await mongoose.connect(url)
    }

    res.json({mongo: " Connected to Database ", databse: mongoose.connection.name})
})

app.listen(PORT, () =>{
    console.log(`Server is running on PORT : ${PORT}`);
    
})