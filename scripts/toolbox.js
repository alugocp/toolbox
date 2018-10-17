const toolbox={
  LIVE_URL:"//alugocp.pythonanywhere.com",
  TEST_URL:"http://localhost:2021",

  request:function(query,callback){
    $.get(toolbox.LIVE_URL,"json="+JSON.stringify(query),function(data){
      callback(data);
    }).fail(function(){
      $(".result-space").empty().append(toolbox.error());
    });
  },
  getData:function(search){
    $(".sideline").stop(true);
    $(".sideline").height("0%");
    $(".sideline").animate({height:"80%"},1000);
    toolbox.request(search,function(data){
      $(".result-space").empty();
      var json=JSON.parse(data);
      for(var a=0;a<json.length;a++) $(".result-space").append(toolbox.result(json[a]));
      $(".sideline").stop(true);
      $(".sideline").height("100%");
    });
  },
  getImage:function(target,name){
    toolbox.request({icon:name},function(data){
      if(data!="") target.attr("src","data:image/png;base64,"+data);
    });
  },
  result:function(data){
    var result=$("<div class='result'></div>").attr("style","--color:"+(data.color || "#ff0323")+";");
    var info=$("<span class=\"data\"></span>");
    info.append((data.link?"<a href=\""+data.link+"\" target=\"_blank\"><img src=\"media/link.png\"></a> ":"")+"<h1><label>"+data.name+"</label></h1>"+(data.version?" "+data.version:"")+"<br>");
    var label=function(field,tag){ if(field) info.append("<label>"+tag+":</label> ","<span>"+(Array.isArray(field)?field.join(", "):field)+"</span>","<br>"); }
    var icon=function(site,image,tag){ if(site) info.append("<a href=\""+site+"\" target=\"_blank\"><img src=\"media/"+image+"\" class=\"icon\" title=\""+tag+"\"></a>"); }
    label(data.platforms,"Platforms")
    label(data.frameworks,"Frameworks");
    label(data.languages,"Languages");
    if(data.desc) info.append("<br><span>"+(Array.isArray(data.desc)?data.desc.join("</span><br><span>"):data.desc)+"</span><br><br>");
    icon(data.github,"github.png","Github");
    icon(data.npm,"npm.png","NPM");
    result.append(info);
    if(data.image){
      var picture=$("<span class=\"data image\"></span>");
      var image=$("<img>");
      toolbox.getImage(image,data.image);
      return result.append(picture.append(image));
    }
    return result;
  },
  welcome:function(){
    var result=$("<div class='result'></div>").attr("style","--color:#ff0323;text-align:center;");
    result.append("<h2>Alex Lugo presents:</h2>","<br>","<h2><img src=\"media/toolbox.png\" style=\"width:60%;height:auto;\"> v1.0</h2>","<br>");
    result.append("<h3>An online repository for all my developer tools</h3>");
    result.append("<h3>Search for any tool by name or leave the search bar blank to load every result</h3>");
    return result;
  },
  error:function(){
    $(".sideline").stop(true);
    return $("<div class='result'></div>")
      .attr("style","--color:#ff0323;text-align:center;")
      .append("<h2><label>Uh-Oh</label></h2>","<h3>It seems there was an error</h3>","<h3>The Toolbox server could not be reached</h3>");
  }
}
