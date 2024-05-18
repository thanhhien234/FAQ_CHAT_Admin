async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login.html");
    }
    
    if (!getCookie("accessToken") || !getCookie("isActive")) {
        await reissue();
        window.location.href = '/';
    } 
    
    if (getCookie("isActive") != "ACTIVE" && window.location.pathname != "/register.html") {
        window.location.href = '/register.html';
    }

    if (getCookie("refreshToken")) {
        await reissue();
    }
}

loginCheck()
    .then(() => {
        $("#answer-menu").trigger("click"); //initially
    });