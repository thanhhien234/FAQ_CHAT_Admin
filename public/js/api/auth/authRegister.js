async function authRegister(studentId, email) { 
    await $.ajax({
        url: config.authServer +'/api/auth/register',
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            studentId: studentId,
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(res) {
            reissue().then(() => {
                location.href = "/";
            })
        },
        error: function(jqXHR, err, thrown) {
            if (jqXHR.status == 409) {
                alert(jqXHR.responseText);
            } else {
                alert('서버 오류입니다.');
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                location.href = '/login.html';
            }
        }
    });
}
