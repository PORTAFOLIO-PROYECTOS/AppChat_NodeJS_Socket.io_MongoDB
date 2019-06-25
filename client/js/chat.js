(() => {
    let socket = io();
    $("form").submit((e)=> {
        e.preventDefault();
        socket.emit("chat message", $("#btn-input").val())
        $("#btn-input").val();
        return true;
    });
})();