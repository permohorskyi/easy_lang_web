
function select(element){
  if (typeof $(element).attr("open_is") === 'undefined') {
        $(element).attr("open_is", false);
    }
    var open_is = ($(element).attr("open_is") === 'true');
    console.log(open_is);
    // Зміна значення атрибута 'open_is' на протилежне
    open_is=!open_is;
    $(".dropdown-select").attr("open_is",false);
    $('.dropdown-list').hide();
    $(element).attr("open_is", open_is);
    let main_dropdown=$(element).closest('.dropdown');
    if(open_is==true){
      
      $(main_dropdown).find(".dropdown-list").toggle();
    }else{
      $(main_dropdown).find(".dropdown-list").hide();
    }
  }
  function select_option(element){
    let main_dropdown=$(element).closest('.dropdown');
    $(main_dropdown).find(".dropdown-select span").text($(element).text());
    $(main_dropdown).find(".dropdown-select span").attr("value",$(element).attr("value"));
    $(main_dropdown).find(".dropdown-list").hide();
  }