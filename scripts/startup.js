$(document).ready(function(){
  $(document).keypress(function(e){
    if(($(".search input[type=text]").is(":focus") || $(".search").is(":focus")) && e.originalEvent.key=="Enter") $(".search .trigger").trigger("click");
  });
  $(".search .trigger").click(function(){
    toolbox.getData({term:$(".search input[type=text]").val().toLowerCase()});
  });
  //toolbox.getData({date:toolbox.THREE_MONTHS});
  $(".result-space").empty().append(toolbox.welcome());
  //toolbox.getData({term:"lodr"});
});
