function auth(){
    var json_input =$('#auth :input').serializeArray();
   
    var authdata = {
        user_name: json_input[0]["value"],
        password: json_input[1]["value"],
    };
    let formData=JSON.stringify(authdata);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/auth",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
                if(data["status"]==true){
                    document.location.href = '/view/userspace/learn/main';
                }else{
                    $(".user_name").addClass("wrong_auth_info");
                    $(".password").addClass("wrong_auth_info");
                    setTimeout(function() {
                        $('.user_name').removeClass('wrong_auth_info');
                        $('.password').removeClass('wrong_auth_info');
                    }, 1500); 
                }
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}
function save_dictionaries(){
    var divArray = [];

    // Використовуємо jQuery для вибору всіх елементів з класом "exampleClass" і додавання їх до масиву
    $(".dropdown_lang").each(function() {
        divArray.push($(this));
    });
    var dictionaries_info={
        dictionaries_ids:[],
        dictionaries_level_ids:[]
    }

    divArray.forEach(function(divElement) {
        // Знаходимо елементи з класом ".selection" всередині поточного divElement
        var dictionary_info = divElement.find(".dictionary_info");
        var dictionary_level=divElement.find(".dictionary_level");
        dictionaries_info.dictionaries_ids.push(parseInt($(dictionary_info).attr("value")));
        dictionaries_info.dictionaries_level_ids.push(parseInt($(dictionary_level).attr("value")));
        // Тепер в selectionElements ви маєте масив з усіма елементами з класом ".selection",
        // які є дочірніми елементами поточного divElement
    });
    let formData=JSON.stringify(dictionaries_info);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/userstart/setdictionaries",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
              
                document.location.href = '/view/userspace/learn/main';
                
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}
function set_current_lang(element){
    
    var current = {
        current_lang:$(element).text()
    };
    let formData=JSON.stringify(current);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/userspace/setCurrentDictionary",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
                if(data["status"]==true){
                    document.location.href = document.location.href;
                }else{
                   
                }
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}
async function translate_deepl(from_lang, into_lang, text) {
    var deepl_translate = {
        from_lang: from_lang,
        into_lang: into_lang,
        text: text
    };
    let formData = JSON.stringify(deepl_translate);
    console.log(formData + "\n");
    let res_text = "";
    
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/deepl/translate",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            res_text = data["text"];
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    
    return res_text;
}
async function translate_gpt_full_speak(from_lang, into_lang, text,text_explain) {
    var gpt_translate = {
        from_lang: from_lang,
        into_lang: into_lang,
        text: text,
        text_explain:text_explain
    };
    let formData = JSON.stringify(gpt_translate);
    console.log(formData + "\n");
    var res_translate={
        translate:"",
        explanation:""
    }
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/gpt/full/speak/translate",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            res_translate.translate=data["sentence"];
            res_translate.explanation=data["explanation"];
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    
    return res_translate;
}
async function translate_gpt_full_formal(from_lang, into_lang, text,text_explain) {
    var gpt_translate = {
        from_lang: from_lang,
        into_lang: into_lang,
        text: text,
        text_explain:text_explain
    };
    let formData = JSON.stringify(gpt_translate);
    console.log(formData + "\n");
    var res_translate={
        translate:"",
        explanation:""
    }
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/gpt/full/formal/translate",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            res_translate.translate=data["sentence"];
            res_translate.explanation=data["explanation"];
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    
    return res_translate;
}
async function translate_gpt_short_speak(from_lang, into_lang, text,text_explain) {
    var gpt_translate = {
        from_lang: from_lang,
        into_lang: into_lang,
        text: text,
        text_explain:text_explain
    };
    let formData = JSON.stringify(gpt_translate);
    console.log(formData + "\n");
    var res_translate={
        translate:"",
        explanation:""
    }
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/gpt/short/speak/translate",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            res_translate.translate=data["sentence"];
            res_translate.explanation=data["explanation"];
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    
    return res_translate;
}
async function translate_gpt_short_formal(from_lang, into_lang, text,text_explain) {
    var gpt_translate = {
        from_lang: from_lang,
        into_lang: into_lang,
        text: text,
        text_explain:text_explain
    };
    let formData = JSON.stringify(gpt_translate);
    console.log(formData + "\n");
    var res_translate={
        translate:"",
        explanation:""
    }
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/gpt/short/formal/translate",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            res_translate.translate=data["sentence"];
            res_translate.explanation=data["explanation"];
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    
    return res_translate;
}
async function delete_history_item(id_item){
    var delete_it = {
        id:id_item
    };
    let formData = JSON.stringify(delete_it);
    console.log(formData + "\n");
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/history/deleteitem",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            console.log("succes save")
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
}
async function delete_dict_item(id_item){
    var delete_it = {
        id:id_item
    };
    let formData = JSON.stringify(delete_it);
    console.log(formData + "\n");
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/dictionary/deleteitem",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            console.log("succes delete")
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
}
async function set_indexdump(indexdump){
    var delete_it = {
        id:indexdump
    };
    let formData = JSON.stringify(delete_it);
    console.log(formData + "\n");
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/dictionary/setindexdump",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            console.log("succes set")
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
}
async function save_translated(lang_from_translated_id, lang_into_translated_id,  translated_text,
    context_text,deepl_translated,deepl_check_deepl,speak_gpt_translated,speak_deepl_check_gpt_translated,speak_explanation_gpt,
    formal_gpt_translated,formal_deepl_check_gpt_translated,formal_explanation_gpt,is_full) {
    var translated = {
        id:0,
        lang_from_translated_id: lang_from_translated_id,
        lang_into_translated_id: lang_into_translated_id,
        translated_text: translated_text,
        context_text:context_text,
        deepl_translated:deepl_translated,
        deepl_check_deepl:deepl_check_deepl,
        speak_gpt_translated:speak_gpt_translated,
        speak_deepl_check_gpt_translated:speak_deepl_check_gpt_translated,
        speak_explanation_gpt:speak_explanation_gpt,
        formal_gpt_translated:formal_gpt_translated,
        formal_deepl_check_gpt_translated:formal_deepl_check_gpt_translated,
        formal_explanation_gpt:formal_explanation_gpt,
        is_full:is_full

    };
    let formData = JSON.stringify(translated);
    console.log(formData + "\n");
   
    try {
        const data = await $.ajax({
            type: "POST",
            url: "/api/userspace/translator/savetranslated",
            data: formData,
            dataType: "json",
            contentType: "application/json"
        });
        
        if (data.hasOwnProperty("error")) {
            if (data["error"] == true) {
                document.location.href = '/settings/error';
            } else {
                document.location.href = '/view/login';
            }
        } else {
            console.log("succes save")
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error if needed
    }
    

}
function add_newsentence(){
    var current = {
        sentence_from:$("#ukr_sentence").val(),
        sentence_from_context:$("#ukr_sentence_context").val(),
        sentence_into:$("#lang_sentence").val()
    };
    let formData=JSON.stringify(current);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/userspace/dictionary/add",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
                if(data["status"]==true){
                    document.location.href = document.location.href;
                }else{
                   
                }
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}