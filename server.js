const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const employeeRouter = require("./routers/employeeRouter");
const devRouter = require("./routers/devRouter");
const mongoose = require("mongoose");
const mgURL = "mongodb://kqian1993:8911236@cluster0-shard-00-00-tkip8.mongodb.net:27017,cluster0-shard-00-01-tkip8.mongodb.net:27017,cluster0-shard-00-02-tkip8.mongodb.net:27017/employeeSystem?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
mongoose.connect(mgURL, {useNewUrlParser:true})
    .then(()=>{
        console.log("database connection success");
    })
    .catch(()=>{
        console.log("database connection fail");
    })
app.use(function(req, res, next){
    console.log("set up CORS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    console.log("allow cors");
    next();
})
app.use('/zpics', express.static('zpics'))
app.use("/api/employee", employeeRouter);
app.use("/api/dev", devRouter);
app.get('*', function (req, res) {
    res.status(404).send('route not found');
    console.log('route not found');
});
app.listen(PORT);
console.log("server set up on port: " + PORT);

