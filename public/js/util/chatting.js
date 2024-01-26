function sendMessage(studentId) {
    var message = $("#messageInput").val();

    if (message.trim() !== "") {
        $("#messageInput").prop("disabled", true);
        $("#submit").prop("disabled", true);
        answerToStudent(studentId,message).finally(() => {
                $("#messageInput").prop("disabled", false);
                $("#messageInput").focus();
                $("#submit").prop("disabled", false);
            })
    }
}


$("#submit").on("click", function () {
    sendMessage(currentStudentId);
    $("#messageInput").val("");
});

$("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        $("#submit").click();
    }
});
