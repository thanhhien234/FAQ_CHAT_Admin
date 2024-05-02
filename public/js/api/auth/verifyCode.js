async function verifyCode(email,code,studentId) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'PATCH',
        data: JSON.stringify({
            email: email,
            code: code
        }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            authRegister(studentId, email);
        },
        error: () => {
            alert("인증번호가 틀렸습니다. 다시 입력해주세요.")
        }
    });
}