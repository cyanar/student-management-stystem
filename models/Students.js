var mongoose = require("mongoose");


var studentSchema = new mongoose.Schema({
    "id"            :       Number,
    "sex"           :       String,
    "shuxue"        :       Number,
    "yuwen"         :       Number,
    "yingyu"        :       Number,
    "name"          :       String,
    "dizhi"         :       String,
    "zongfen"       :       Number
});

var Student = mongoose.model("Student",studentSchema);

module.exports = Student;