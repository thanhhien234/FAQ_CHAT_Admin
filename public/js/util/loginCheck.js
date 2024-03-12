async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login.html");
    } else if (!getCookie("accessToken")) {
        await reissue();
    }
}

loginCheck()
    .then(() => {
        $("#answer-menu").trigger("click"); //initially
    });