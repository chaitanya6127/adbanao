const express = require("express");
const mongoose = require('mongoose');
const connectToMongoDB = require("./database/connection");

const app = express();

const authRouter = require("./routers/auth.route");
const userRouter = require("./routers/users.route"); 
const photoRoutes = require('./routers/photo.route');
const postRoutes = require('./routers/post.route') ;
const catagoryRoutes = require('./routers/catagory.route') ;


require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB()
  .then(() => {         
    console.log('Connection Successful');
  })
  .catch((error) => {
    console.error('Not connected', error);
  });


app.use("/api/addbanao/users", userRouter);
app.use("/api/addbanao/auth", authRouter);
app.use("/api/addbanao/photos", photoRoutes);
app.use("/api/addbanao/post", postRoutes);
app.use("/api/addbanao/catagory", catagoryRoutes);

const port =  8001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


