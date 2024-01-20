async function loginCheck() {
    if (!getCookie("accessToken") && !getCookie("refreshToken")) {
        location.replace("/login");
    } else if (!getCookie("accessToken")) {
        await reissue();
    }
}