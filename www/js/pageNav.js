(function(){
     var pageNav = window.pageNav = function(){
          this.$box = $("#pagenav");
          this.$box.delegate("li","click",function(){
              var num = $(this).data("number");
              dataTable.goto(num);
          });
         $("#pagesize_sele").change(function(){
              dataTable.pagesize = $(this).val();
              dataTable.fetchData();
         })
     }
     pageNav.prototype.createDom = function(){
          var $ul = this.$box.find("ul");
          var pagetotal = dataTable.pagetotal;
          $("#pagesize_sele").val(dataTable.pagesize);
          if(pagetotal>=9){
             $ul.empty();
             for(var i=1;i<=9;i++){
              $ul.append($("<li><a></a></li>"));
             }

          }
          if(pagetotal<9){
              $ul.empty();
              for(var i=1;i<=pagetotal;i++){
                 $ul.append($("<li><a>"+i+"</a></li>"));
              }
          }else if(dataTable.page<=5){
              $ul.find("li").eq(0).attr("data-number",1).find("a").html(1);
              $ul.find("li").eq(1).attr("data-number",2).find("a").html(2);
              $ul.find("li").eq(2).attr("data-number",3).find("a").html(3);
              $ul.find("li").eq(3).attr("data-number",4).find("a").html(4);
              $ul.find("li").eq(4).attr("data-number",5).find("a").html(5);
              $ul.find("li").eq(5).attr("data-number",6).find("a").html(6);
              $ul.find("li").eq(6).attr("data-number",7).find("a").html(7);
              $ul.find("li").eq(7).attr("data-number","").find("a").html("...");
              $ul.find("li").eq(8).attr("data-number",pagetotal).find("a").html(pagetotal);
          }else if(dataTable.page<=pagetotal-4){
              $ul.find("li").eq(0).attr("data-number",1).find("a").html(1);
              $ul.find("li").eq(1).attr("data-number","").find("a").html("...");
              $ul.find("li").eq(2).attr("data-number",dataTable.page-2).find("a").html(dataTable.page-2);
              $ul.find("li").eq(3).attr("data-number",dataTable.page-1).find("a").html(dataTable.page-1);
              $ul.find("li").eq(4).attr("data-number",dataTable.page).find("a").html(dataTable.page);
              $ul.find("li").eq(5).attr("data-number",dataTable.page+1).find("a").html(dataTable.page+1);
              $ul.find("li").eq(6).attr("data-number",dataTable.page+2).find("a").html(dataTable.page+2);
              $ul.find("li").eq(7).attr("data-number","").find("a").html("...");
              $ul.find("li").eq(8).attr("data-number",pagetotal).find("a").html(pagetotal);
          }else{
              $ul.find("li").eq(0).attr("data-number",1).find("a").html(1);
              $ul.find("li").eq(1).attr("data-number","").find("a").html("...");
              $ul.find("li").eq(2).attr("data-number",pagetotal-6).find("a").html(pagetotal-6);
              $ul.find("li").eq(3).attr("data-number",pagetotal-5).find("a").html(pagetotal-5);
              $ul.find("li").eq(4).attr("data-number",pagetotal-4).find("a").html(pagetotal-4);
              $ul.find("li").eq(5).attr("data-number",pagetotal-3).find("a").html(pagetotal-3);
              $ul.find("li").eq(6).attr("data-number",pagetotal-2).find("a").html(pagetotal-2);
              $ul.find("li").eq(7).attr("data-number",pagetotal-1).find("a").html(pagetotal-1);
              $ul.find("li").eq(8).attr("data-number",1).find("a").html(pagetotal);
          }

         $ul.find("li[data-number="+dataTable.page+"]").addClass("active").siblings().removeClass("active");
         $("#nav_span1").html(dataTable.datatotal);
         $("#nav_span2").html(dataTable.pagesize);
         $("#nav_span3").html(dataTable.pagetotal);
     }
})()