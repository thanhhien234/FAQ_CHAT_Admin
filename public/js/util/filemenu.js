const fileMenuInner = $(".file-menu-inner");

fileMenuBtn.on("click", function () {
    if (fileMenuInner.hasClass("close")) {
        fileMenuInner.removeClass("close");
    } else {
        fileMenuInner.addClass("close");
    }
})