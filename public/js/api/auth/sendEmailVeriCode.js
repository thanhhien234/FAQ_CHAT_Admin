async function sendVerificationCode(email) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'POST',
        data: JSON.stringify({
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
    });
}