var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lsms');
var studentCtrl = require("./controllers/studentCtrl.js");
app.use(express.static("www"));

app.get("/students",studentCtrl.getStudents);
app.delete("/students",studentCtrl.removeStudents);
app.patch("/students",studentCtrl.addStudent);
app.post("/students",studentCtrl.modifyStudent);
app.listen(3000,(err)=>{
     console.log("success:3000");
});
