/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    var i = 0;
    var k = 0;
    var timer = 3000;
    var loopPath;
    var scrollUp;
    var result;
    var resultDiv;
    var text = $('#text');
    text.bind('keyup',function(e){
        var s = String.fromCharCode(e.which);
        if(e.keyCode === 8){
            $('.letter').eq(i-1).html("");
            i--;
        } else {
            $('.letter').eq(i).html(s);
            i++;
        }
        if(text.val() != null && text.val().length <= 0){
            $('.letter').html("");
            i = 0;
        }
    });
    
    $('#send').bind('click',function(e){
       e.preventDefault();
       text = {text: text.val()};
       $.ajax({
            type:'POST',
            url:'cracker.php',
            data:text,
            success:function(words){
                result = JSON.parse(words);
                showAllWords(result);
                highLightPath();
                resultDiv = $('#result');      
            },
            error:function(){
                alert("ajax nao funcionou");
            }
        });
       
    });
    
    $('#reset').bind('click',function(){
        window.location.href = window.location.href;
    });
    $('#previous').bind('click',function(){
        if(k > 1){
            k = k - 2;
            highLightPath();
        } else {
            k = 0;
            highLightPath();
        }
    });
    
    $('#stop').bind('click',stopAuto);
    var first = false;
    function stopAuto(){
        if(first){
            clearInterval(loopPath);
            clearInterval(scrollUp);
            $('#stop').html('Auto'); 
        } else {
            loopPath = setInterval(highLightPath,timer);
            scrollUp = setInterval(scrollResults,timer);
            $('#stop').html('Stop');
        }
        first = !first;
    }    
    
    $('#next').bind('click',function(){
        highLightPath();
        scrollResults();
    });
    
    function scrollResults(){
        var pos = resultDiv.scrollTop();
        resultDiv.scrollTop(pos + 40);
    }
    
    function showAllWords(array){
        for(var i=0;i<array.length;i++){
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class','newdiv');
            $(newDiv).html(array[i][0]);
            $('#result').append(newDiv);
        }
    }
    
    function highLightPath(){
        $('.letter').css('background-color','#ffffcc');
        $('.newdiv').css('background-color','#fff');
        var evenIndex = even(result[k][1]);
        var oddIndex = odd(result[k][1]);
        for(var i=0;i<evenIndex.length;i++){
            var indexofDiv = evenIndex[i]+(4*oddIndex[i]);
            var color = addHexColor('535',(111 * i));
            $('.letter').eq(indexofDiv).css('background-color','#'+color);
            $('.newdiv').eq(k).css('background-color','#888');  
        }
        
        if(k < result.length){
            k++;
        } else {
            clearInterval(loopPath);
        }
    }
    
    function even(string){
        var even = [];
        for(var i = 0; i < Math.ceil(string.length/2); i++){
            even[i] = parseInt(string[i*2]);
        }
        return even;
    }
    
    function odd(string){
        var odd = [];
        for(var i = 0; i < Math.floor(string.length/2); i++){
            odd[i] = parseInt(string[(i*2)+1]);
        }
        return odd;
    }
    
    function addHexColor(c1, c2) {
        var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
        while (hexStr.length < 3) { hexStr = '0' + hexStr; } // Zero pad.
        return hexStr;
    }
    
    
    
});