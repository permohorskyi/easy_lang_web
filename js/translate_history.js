let current_lang_history_name;
$(document).ready(function() {
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = segments[segments.length - 1]; // Взяти останній елемент, який є номером сторінки
    $(".first_page").text(pageNumber);
    current_lang_history_name=$('.lang_name[value="'+current_lang_history_id+'"]').text();
    select_option($('.lang_name[value="'+current_lang_history_id+'"]'));
});
function go_back(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1]);
    if (pageNumber>1){
        pageNumber=pageNumber-1;
        document.location.href="/view/userspace/translate/history/"+current_lang_history_name+"/p/"+pageNumber;
    } 
    
}
function go_next(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1])+1; 
    document.location.href="/view/userspace/translate/history/"+current_lang_history_name+"/p/"+pageNumber;

}
function go_first(){
    document.location.href="/view/userspace/translate/history/"+current_lang_history_name+"/p/1";

}
async function delete_item(element){
    let id=parseInt($(element).closest('.story_item').attr("value"));
    await delete_history_item(id);
    document.location.href=document.location.href;
}
function select_lang_history(element){
    document.location.href="/view/userspace/translate/history/"+$(element).text()+"/p/1";
}