async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login.html");
    } else if (!getCookie("accessToken")) {
        await reissue();
    } else if (getCookie("isActive") != "ACTIVE" && window.location.pathname != "/register.html") {
        window.location.href = '/register.html';
    }
}

loginCheck()
    .then(() => {
        $("#answer-menu").trigger("click"); //initially
    });