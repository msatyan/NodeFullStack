'use strict';

class MyApiTest1
{
    constructor()
    {
    }

    SimpleAjax(ajaxObj, MyDataHandler, MyErrorHandler)
    {
        var request = $.ajax(ajaxObj);

        request.done(function (data)
        {
            MyDataHandler(data);
            MyErrorHandler( undefined );
        });

        
        request.fail(function (jqXHR, textStatus, err)
        {
            // just pass the jqXHR: Promise interface
            MyErrorHandler(jqXHR);
            MyDataHandler({});
        });
    }

    DisplayError(jqXHR)
    {

        var errView = $("#MyErrorText");

        if (jqXHR == undefined)
        {
            errView.text(' ');

            if (errView.hasClass("alert-danger")) {
                errView.removeClass("alert-danger");
            }
            errView.addClass("alert-success");
            errView.css("padding", "0px");
        }
        else
        {
            errView.text(jqXHR.status + ' Error : ' + jqXHR.statusText);

            if (errView.hasClass("alert-success"))
            {
                errView.removeClass("alert-success");
            }
            errView.css("padding", "10px");
            errView.addClass("alert-danger");
        }
    }


    DisplayJsonData(TheJsonData)
    {

        var jsonObj = undefined;
        if (typeof TheJsonData === 'string' || TheJsonData instanceof String)
        {
            jsonObj = JSON.parse(TheJsonData);
        }
        else
        {
            jsonObj = TheJsonData;
        }
        
        var jsonPretty = JSON.stringify(jsonObj, null, ' ');
        $('#MyJsonResult').empty().append(jsonPretty);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    }

    TrySimpleGet()
    {
        var ajaxObj = {
            url: "/product",
            method: "GET",
            dataType: "json"
        };

        ajaxObj.url = $('#MyGetUri').val();

        this.SimpleAjax(ajaxObj, DemoObj.DisplayJsonData, DemoObj.DisplayError);
    }

    TryAnyAction()
    {
        var ajaxObj = {
            url: "/product",
            method: "POST",
            dataType: "json",
            data: undefined,
        };

        ajaxObj.url = $('#MyActionUri').val();

        var elem = document.getElementById("Action1");
        ajaxObj.method = elem.innerText;

        if( ajaxObj.method == "POST")
        {
            var elem = document.getElementById("MyInputTextarea");
            var x = JSON.parse(elem.value);

            console.log( x );
            ajaxObj.data = x;
        }

        this.SimpleAjax(ajaxObj, DemoObj.DisplayJsonData, DemoObj.DisplayError);
    }    
}

const DemoObj = new MyApiTest1();


//$(document).ready(  function ()
$(() => {
    // jQuery document ready
    var LocalData = '{ "name": "Static Json Data","author": { "name": "Gandhi", "email": "123@gmail.com", "contact": [{"location": "office", "number": 123456}, {"location": "home", "number": 987654}] } }';

    //DisplayData(LocalData);
    DemoObj.DisplayJsonData(LocalData);
    DemoObj.DisplayError(undefined);

    $('#MyInputTextarea').empty();

    $('.MyActionSelectList li  a').click(function(e){
        var elem = document.getElementById("Action1");
        elem.innerText = $(this).text();       
    });
});

