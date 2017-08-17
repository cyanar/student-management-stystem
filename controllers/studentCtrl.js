var Student = require("../models/Students.js");
var formidable = require("formidable");

var url = require("url");

exports.getStudents = (req,res)=>{
    var page = url.parse(req.url,true).query.page ||1;
    var pagesize = url.parse(req.url,true).query.pagesize||10;
    var keyword = url.parse(req.url,true).query.keyword;
    var orderby = url.parse(req.url,true).query.orderby||"id";
    var direction = url.parse(req.url,true).query.direction||1;

    var kw = new RegExp(keyword,"g");
    Student.count({"name":kw},(err,count)=>{
         Student.find({"name":kw}).sort({[orderby]:direction}).skip(pagesize*(page-1)).limit(pagesize).exec((err,docs)=>{
         res.json({"datatotal":count,"results":docs});
      });
    })
};

exports.removeStudents =(req,res)=>{
   var form = new formidable.IncomingForm();
   form.parse(req,(err,fields)=>{
      var id = Number(fields.id);
      if(fields.arr){
         var arr = JSON.parse(fields.arr);
      }
      if(!arr){
           Student.remove({"id":id},(err)=>{
           res.send("ok");
         });
      }else{
          Student.remove({"id":{"$in":arr}},(err)=>{
           res.send("ok");
         });
      }
   })
};

exports.addStudent = (req,res)=>{
 var form = new formidable.IncomingForm();
 form.parse(req,(err,fields)=>{
      var s = new Student({
        id  : Number(fields.id),
        name  :  fields.name,
        sex  :  fields.sex,
        dizhi :  fields.dizhi,
        yuwen  :   Number(fields.yuwen),
        shuxue :   Number(fields.shuxue),
        yingyu  :  Number(fields.yingyu),
        zongfen :  Number(fields.yuwen) + Number(fields.shuxue) + Number(fields.yingyu)
      });
    s.save(()=>{
       res.send("ok");
    })
 });
};

exports.modifyStudent = (req,res)=>{
     var form = new formidable.IncomingForm();
     form.parse(req,(err,fields)=>{
         var id = Number(fields.id);
         var k = fields.k;
         var v = fields.v;

         Student.find({"id":id},(err,docs)=>{
             var s = docs[0];
             s[k] = v;
             s["zongfen"] = s["shuxue"]+s["yingyu"]+s["yuwen"];
             s.save(()=>{
               res.send("ok");
             })
         })
     });
}
