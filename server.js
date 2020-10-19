
if(process.env.NODE_ENV !== "production"){
    require("dotenv").parse();
}

const express = require("express");

const indexRouter = require("./routes/index");

const expresslayout = require("express-ejs-layouts");

const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});

const db = mongoose.connection;

db.on("error", error =>{
    console.error(error)
};

db.once("open", () =>{
    console.log("mongoose db connected")
})



const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");

app.use(express.static("public"));

app.set("layout", "layouts/layout" );

app.use(expresslayout);


app.use("/", indexRouter);


app.listen(process.env.PORT||3000, () =>{
    console.log("Server listening")
});

