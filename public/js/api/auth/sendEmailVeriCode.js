async function sendVerificationCode(email) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'POST',
        data: JSON.stringify({
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            alert('인증코드를 이메일로 전송했습니다');
        },
        error: function(err) {
            alert('인증코드 전송은 오류가 발생했습니다. 다시 시도해 주세요');
        }
    });
}