"use strict";

const _SOCKET = io();
const _MESSAJES = document.getElementById("listaMensajes");

(() => {
    $("form").submit((e) => {
        e.preventDefault();
        let li = document.createElement("li");
        _SOCKET.emit("chat message", $("#mensaje").val());

        _MESSAJES.appendChild(li).append($("#mensaje").val());

        let span = document.createElement("span");
        _MESSAJES.appendChild(span).append(`por Anónimo: justo ahora`);
        $("#mensaje").val("");
        return false;
    })
})();

(() => {
    fetch("/chat").then(data => {
        return data.json();
    }).then(json =>{
        json.map(data=>{
            let li = document.createElement("li");
            let span = document.createElement("span");
            _MESSAJES.appendChild(li).append(data.message);
            _MESSAJES.appendChild(span).append(`por ${data.sender}: fechaFalta`);
        });
    });
})();