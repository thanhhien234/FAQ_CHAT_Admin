async function sendVerificationCode(email) {
    await $.ajax({
        url: config.emailServer +'/api/email/verification-code',
        type: 'POST',
        data: JSON.stringify({
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(response) {
            console.log('Success:', response);
            resolve(response); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX Error:', textStatus, errorThrown);
            console.log('Response code:', jqXHR.status);
            console.log('Response text:', jqXHR.responseText); 
            reject(errorThrown);
        }
    });
}