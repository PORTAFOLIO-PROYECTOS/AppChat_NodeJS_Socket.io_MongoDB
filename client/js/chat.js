(() => {
    let socket = io();
    $("form").submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());
        $("#message").val("");
        return true;
    })
})();