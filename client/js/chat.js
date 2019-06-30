"use strict";

const _SOCKET = io();
const _MESSAJES = $("#listaMensajes");

function crearHTML(mensaje, fecha) {
    return `
    <li class="left clearfix">
        <div class="chat-body clearfix">
            <div class="header">
                <strong class="primary-font">Anónimo</strong>
                <small class="pull-right text-muted">
                    <span class="glyphicon glyphicon-time"></span>${fecha}
                </small>
            </div>
            <p>${mensaje}</p>
        </div>
    </li>`;
}

(() => {
    $("form").submit((e) => {
        e.preventDefault();

        _SOCKET.emit("chat message", $("#mensaje").val());

        let html = crearHTML($("#mensaje").val(), "justo ahora");

        _MESSAJES.append(html);

        $("#mensaje").val("");

        $(".card-body").animate({
            scrollTop: $(this).height()
        }, "slow");

        return false;
    });

    _SOCKET.on("received", data => {
        let html = crearHTML(data.message, "justo ahora");
        _MESSAJES.append(html);
        $(".card-body").animate({
            scrollTop: $(this).height()
        }, "slow");
    });
})();

(() => {
    fetch("/chat").then(data => {
        return data.json();
    }).then(json => {
        json.map(data => {
            let html = crearHTML(data.message, formatTimeAgo(data.createdAt));
            _MESSAJES.append(html);
        });
        $(".card-body").animate({
            scrollTop: $(this).height()
        }, "slow");
    });
})();