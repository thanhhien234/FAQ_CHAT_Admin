async function verifyCode(email,code) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'PATCH',
        data: JSON.stringify({
            email: email,
            code: code
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            alert('인증 성공했습니다.')
        },
        error: function(err) {
            alert('인증 실패했습니다.')
        }
    });
}