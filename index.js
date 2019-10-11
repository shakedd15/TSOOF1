var count = 0 ;
var dataObject;

function encodeHTML(text) {
    return text.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function check(os, name) {
    document.getElementById(name).checked = os;
}

window.onload = function() {
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open( "GET", aUrl, false );
            anHttpRequest.send( null );
        }
    }
    
    var list;
    var client = new HttpClient();
    client.get('https://api.myjson.com/bins/11v7vr', function(response) {
        list = response;
    });
    this.dataObject = JSON.parse(list);

    createListPlease();
};

function createListPlease() {
    var listItemString = $('#listItem').html();
    Object.keys(this.dataObject).forEach(buildNewList);

    function buildNewList(item) {
        var listItem = "";
        if(this.dataObject[item] == "true"){
            listItem = $('<dt class="strikeout">' + listItemString + '</dt>');
        } else{
            listItem = $('<dt class="regular">' + listItemString + '</dt>');
        }
        var listItemTitle = $('.title', listItem);
        var insert = "<input type=\"checkbox\" onclick=\"checking(this)\" id=\"" + item + "\">" + item;
        listItemTitle.html(insert);
        $('#dataList').append(listItem);
        if(this.dataObject[item] == "true"){
            check(this.dataObject[item], item);
        }
        count++;
    }
}

function checking(el) {
    Object.keys(this.dataObject).forEach(function(key) {
        if(key == el.id){
            if(this.dataObject[el.id] == "true"){
                this.dataObject[el.id] = "false";
            } else {
                this.dataObject[el.id] = "true";
            }
        }
    });
}

function saveChanges() {
    $.ajax({
        url:"https://api.myjson.com/bins/11v7vr",
        type:"PUT",
        data:JSON.stringify(this.dataObject),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus, jqXHR){
            window.alert("השמירה הצליחה מאמי")
        }
    });
}

function addToList() {
    var name = document.getElementById("added").value;
    this.dataObject[name] = "false";

    var listItemString = $('#listItem').html();
    var listItem = $('<li style="color: white;\n' +
        'font-family: cursive;\n' + 'text-align: center;' +
        'font-size: 200%;">' + listItemString + '</li>');
    var listItemTitle = $('.title', listItem);
    var insert = "<input type=\"checkbox\" onclick=\"checking(this)\" id=\"" + name + "\">" + name;
    listItemTitle.html(insert);
    $('#dataList').append(listItem);
}

// {
//     "shaked": "true",
//     "tsoof": "false"
// }