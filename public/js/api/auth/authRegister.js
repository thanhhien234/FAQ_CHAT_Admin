async function authRegister(studentId, name, email) { 
    await $.ajax({
        url: config.authServer +'/api/auth/register',
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: JSON.stringify({
            studentId: studentId,
            name: name,
            email: email
        }),
        contentType: 'application/json; charset=utf-8',
        
        success: function(res) {
            location.href = "/";
        },
        error: function() {
            alert("관리자에게 문의해주세요.")
        }
    });
}
