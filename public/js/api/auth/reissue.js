async function reissue() {
    await $.ajax({
        type: "POST",
        url: config.authServer + "/api/auth/reissue",
        headers: {
            Authorization: "Bearer " + getCookie("refreshToken")
        },
        success: function (res) {
            setCookie("accessToken", res.accessToken, 2 * 60);
            setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
            if (res.registerStateEnum === "INACTIVE") {
                alert("관리자에게 사용자 등록 요청해주세요.");
                location.replace("/login.html");
            } else {
                location.reload();
            }
        },
        error: function (err) {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            location.href = "/login.html";
        }
    })
}