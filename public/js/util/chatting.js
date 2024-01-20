function sendMessage(studentId) {
    var message = $("#messageInput").val();

    if (message.trim() !== "") {
        answerToStudent(studentId,message)
    }
}


$("#submit").on("click", function () {
    sendMessage(currentStudentId);
});

$("#messageInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(currentStudentId);
        $("#messageInput").val("");
    }
});
