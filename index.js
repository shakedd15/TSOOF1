function encodeHTML(text) {
    return text.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function check() {
    document.getElementById("second").checked = true;
}

function uncheck() {
    document.getElementById("myCheck").checked = false;
}

window.onload = function() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.myjson.com/bins/jr6vz", false ); // false for synchronous request
    xmlHttp.send( null );
    var list = xmlHttp.responseText;
};