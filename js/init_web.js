function add_lang(){
  let select=$('.select_base').clone();
        $(select).removeClass("none");
        $(select).removeClass("select_base");
        $(select).addClass("dropdown_lang")
        $(select).appendTo('.langs');
}
$(document).ready(function() {
    // Обробник кліка для відкриття/закриття випадаючого списку
    // $('.dropdown-select').click(function() {
    //   $('.dropdown-list').toggle();
    // });
  
    // Обробник кліка для вибору опції із списку
    // $('.dropdown-list li').click(function() {
    //   $('.dropdown-select span').text($(this).text());
    //   $('.dropdown-select span').attr("value",$(this).attr("value"));
    //   $('.dropdown-list').hide();
    // });
    add_lang();
    $('.add_lang').click(function() {
        add_lang();
      });
  });
  