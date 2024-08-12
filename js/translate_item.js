function back_page(){
    window.history.back();
}
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';  // Відсутність видимості на екрані
    textArea.style.opacity = '0';       // Зробити невидимим
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'успішно' : 'не вдалося';
        console.log('Копіювання тексту було ' + msg);
    } catch (err) {
        console.error('Помилка при копіюванні через execCommand: ', err);
    }

    document.body.removeChild(textArea);
}
function copy(element){
    let text=$(element).closest(".item_info").find(".text").text();
    let textToCopy=text;
    copyTextToClipboard(textToCopy);
    
 
}
async function delete_item(){
    
    await delete_history_item(current_id);
    back_page();
}
var last_from_lang=$(".lang_from_t").text();
var last_into_lang=$(".lang_into_t").text();
let currentAudio = null; // Глобальна змінна для збереження поточного аудіоелемента

function speech(element) {
    let widget = $(element).closest('.widget');
    let name_lang = "";
    if (widget.hasClass('from_text')) {
        name_lang = last_from_lang;
    } else {
        name_lang = last_into_lang;
    }
    let text = $(element).closest('.item_info').find(".text").text();
    if (text == "") {
        text = "Тестування"
    }
    const requestData = {
        name_lang: name_lang,
        text: text
    };
    console.log("REQ:" + JSON.stringify(requestData));
    fetch('/api/service/textToAudio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
        credentials: 'include' // Додає куки і аутентифікацію до запиту
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Перетворення відповіді на Blob
    })
    .then(blob => {
        if (currentAudio) {
            currentAudio.pause(); // Зупинити поточне аудіо
            currentAudio.src = ""; // Очистити джерело
        }

        const url = URL.createObjectURL(blob); // Створення URL для Blob
        currentAudio = new Audio(url); // Створення аудіо елемента
        currentAudio.play(); // Відтворення аудіо

        currentAudio.onended = function() {
            URL.revokeObjectURL(url); // Видалення URL для звільнення пам'яті
            console.log('Audio has been played and removed from memory');
            currentAudio = null; // Очистити посилання на поточний аудіоелемент
        };
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}