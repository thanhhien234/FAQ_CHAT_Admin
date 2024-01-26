async function sendVerificationCode(email) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'POST',
        data: JSON.stringify({
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function() {
        },
        error: function(err) {
            alert('인증코드 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
        }
    });
}