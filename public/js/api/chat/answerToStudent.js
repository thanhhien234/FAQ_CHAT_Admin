//학생에게 답변 작성
async function answerToStudent(studentId, comment) {
    await $.ajax({
        url: config.chatServer + "/api/prof",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            "studentId": studentId,
            "comment": comment
        }),

        success: function (res) {
            searchChat(studentId)
        },
        error: function (err) {
            alert('서버 오류입니다.')
        }
    })
}