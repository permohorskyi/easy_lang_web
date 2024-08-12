async function getDataFromJsonbin() {
    let binId="669b8a31e41b4d34e4148606";
    let apiKey="$2a$10$kAo0.pfVYv5sMm2baWg9Z.6aHG8Hy3OYFC2hOA670a8uaeRVbvPEW";
    const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;
    const headers = {
        'X-Master-Key': apiKey
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.record;  // Adjust according to the structure of the returned data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
function getDataFromJsonbinSync() {
    let binId="669b8a31e41b4d34e4148606";
    let apiKey="$2a$10$kAo0.pfVYv5sMm2baWg9Z.6aHG8Hy3OYFC2hOA670a8uaeRVbvPEW";
    const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, false); // Синхронний запит
    xhr.setRequestHeader("X-Master-Key", apiKey);

    try {
        xhr.send();
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            return response.record; // Adjust according to the structure of the returned data
        } else {
            throw new Error(`HTTP error! status: ${xhr.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
$(document).ready(async function() {
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = segments[segments.length - 1]; // Взяти останній елемент, який є номером сторінки
    $(".first_page").text(pageNumber);
    $(".pointer").css('background-color', "#827ffe");
    $(".item_sentence[value="+index_dump+"]").find(".pointer").css('background-color', 'rgb(47, 207, 47)');
   
});
function downloadFile(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Отримання заголовка Content-Disposition
            const disposition = response.headers.get('Content-Disposition');
            let fileName = 'downloaded-file'; // Значення за замовчуванням, якщо ім'я файлу не визначено

            if (disposition && disposition.indexOf('attachment') !== -1) {
                const fileNameMatch = disposition.match(/filename="(.+)"/);
                if (fileNameMatch != null && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            return response.blob().then(blob => {
                const a = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName; // Встановлення імені файлу
                a.click();
                window.URL.revokeObjectURL(url);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function dump_index(){
    downloadFile("/api/userspace/dictionary/getfromindexdump");
    
}
function dump(){
    downloadFile("/api/userspace/dictionary/getdump");
   
}
function go_back(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1]);
    if (pageNumber>1){
        pageNumber=pageNumber-1;
        document.location.href="/view/userspace/dictionary/p/"+pageNumber;
    } 
    
}
function go_next(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1])+1; 
    document.location.href="/view/userspace/dictionary/p/"+pageNumber;

}
function go_first(){
    document.location.href="/view/userspace/dictionary/p/1";

}
async function delete_item(element){
    let id=parseInt($(element).closest('.item_sentence').attr("value"));
    await delete_dict_item(id);
    document.location.href=document.location.href;
}
async function set_item(element){
    let id=parseInt($(element).closest('.item_sentence').attr("value"));
    $(".pointer").css('background-color', "#827ffe");
    $(element).css('background-color', 'rgb(47, 207, 47)');
    await set_indexdump(id);
    document.location.href=document.location.href;
}