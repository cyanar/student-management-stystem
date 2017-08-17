(function(){
     var dataTable = window.dataTable = function(){
          this.data = [];
          this.page = 1;
          this.pagesize = 10;
          this.orderby = "id";
          this.direction = 1;
          this.keyword = "";
          this.datatotal = 0;
          this.pageNav = new pageNav();
          this.$datatable = $("#datatable");
          this.fetchData();

          this.bindEvent();
     }
     dataTable.prototype.bindEvent = function(){
           var self = this;
           $("#filter-text").bind("input",function(){
             self.keyword = $(this).val();
             self.fetchData();
        });

          this.$datatable.delegate(".del","click",function(){
              var id = $(this).data("id");
              $.ajax({
                 "url":"/students",
                 "type":"DELETE",
                 "data":{
                    "id":id
                 },
                 "success":function(){
                     self.fetchData();
                 }
              })
          });
          $("#delmanybtn").click(function(){
               var arr = [];
               $("td input[type=checkbox]:checked").each(function(){
                   arr.push($(this).data("id"));
               });
               $.ajax({
                  "url":"/students",
                  "type":"delete",
                  "data":{
                     "arr":JSON.stringify(arr)
                  },
                  "traditional": true,
                  "success":function(){
                     self.fetchData();
                  }
               });
          })
          this.$datatable.delegate("th[data-title]","click",function(){
               var title = $(this).data("title");
               if(title==self.orderby){
                  self.setOrder(title,self.direction * -1);
               }else{
                  self.setOrder(title,self.direction);
               }
          });

          this.$datatable.delegate("td[data-editable]","mouseenter",function(){
               $span = $("<span class='glyphicon glyphicon-pencil pencil'></span>");
               $(this).append($span);
          });
          this.$datatable.delegate("td[data-editable]","mouseleave",function(){
               $(this).find("span.pencil").remove();
          });

          this.$datatable.delegate(".pencil","click",function(){
              var txt = $(this).siblings("b").html();
              $(this).siblings("b").hide();
              $(this).parent().prepend($("<input type = 'text' class = 'modifyTxt' value='"+txt+"'>"));
          });
          this.$datatable.delegate(".modifyTxt","blur",function(){
              var id = $(this).parent("td").data("id");
              var k = $(this).parent("td").data("title");
              var v = $(this).val();

              $.ajax({
                 "url":"/students",
                 "type":"post",
                 "data":{
                   id: id,
                   k : k,
                   v: v
                 },
                 "success":function(){
                    self.fetchData();
                 }
              })

          })
          $("th input[type=checkbox]").change(function(){
             var v = $(this)[0].checked;
           $("td input[type=checkbox]").attr("checked" , v);
           self.fetchData();
         });
     }
     dataTable.prototype.fetchData = function(){
        var self = this;
         $.get("/students",{
            "page": this.page,
            "pagesize":this.pagesize,
            "keyword":this.keyword,
            "orderby":this.orderby,
            "direction":this.direction
         },function(data){
            self.data = data.results;
            self.datatotal = data.datatotal;
            self.pagetotal = Math.ceil(self.datatotal/self.pagesize);
            self.createTableDom();
            self.pageNav.createDom();
         })
     };

    dataTable.prototype.createTableDom = function(){
         var $tbody = this.$datatable.find("tbody");

         $tbody.empty();
         this.data.forEach(function(item){
            var $tr = $("<tr></tr>");
            $tr.append("<td><input type ='checkbox' data-id ='"+item.id+"'></td>");
            $tr.append("<td>"+item.id+"</td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='name'><b>"+item.name+"</b></td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='sex'><b>"+item.sex+"</b></td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='yuwen'><b>"+item.yuwen+"</b></td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='shuxue'><b>"+item.shuxue+"</b></td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='yingyu'><b>"+item.yingyu+"</b></td>");
            $tr.append("<td>"+item.zongfen+"</td>");
            $tr.append("<td data-editable data-id='" + item.id + "' data-title='dizhi'><b>"+item.dizhi+"</b></td>");
            $tr.append("<td><a class='del'  data-id=" + item.id + " href='javascript:;'>删除</a></td>");
            $tbody.append($tr);
         });
         this.$datatable.find("th span").remove();
        var classname = this.direction == -1 ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up";
        this.$datatable.find("th[data-title="+this.orderby+"]").append("<span class='" + classname +"'></span>");

       $("td input[type=checkbox]").attr("checked" , $("th input[type=checkbox]")[0].checked);
     }
    dataTable.prototype.goto = function(number){
          this.page = number;
          this.fetchData();
    }
    dataTable.prototype.setOrder = function(orderby,direction){
          this.orderby = orderby;
          this.direction = direction;
          this.fetchData();
    }
})()