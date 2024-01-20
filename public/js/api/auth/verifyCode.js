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
            console.log('Success:', code);
        },
        error: function(err) {
            console.error(err);
        }
    });
}