function supports_input_placeholder(){  
    var i = document.createElement("input");  
    return "placeholder" in i;
}
// 让不支持placeholder的浏览器实现此属性  
$(function(){  
    var input_placeholder = $("input[placeholder],textarea[placeholder]"); 
    if (input_placeholder.length !== 0 && !supports_input_placeholder()) { 
        var color_place = "#A9A9A9";   
        $.each(input_placeholder, function(i){  
            var isUserEnter = 0; // 是否为用户输入内容,placeholder允许用户的输入和默认内容一样  
            var ph = $(this).attr("placeholder");  
            var curColor = $(this).css("color");  
            $(this).val(ph).css("color", color_place); 
            $(this).focus(function(){  
                if ($(this).val() == ph && !isUserEnter) $(this).val("").css("color", curColor);  
            }).blur(function(){  
                if ($(this).val() == "") {  
                    $(this).val(ph).css("color", color_place);  
                    isUserEnter = 0;  
                }  
            }).keyup(function(){  
                if ($(this).val() !== ph) isUserEnter = 1;  
            });  
        });  
    }  
})