const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");

toggleBtn.on("click", function () {
    if (sideBar.hasClass('close')) {
        sideBar.removeClass('close');
        setTimeout(function () {
            listRightContent.css("display", "flex");
        }, 500);
    } else {
        sideBar.addClass('close');
        listRightContent.css("display", "none");
    }
})

menuList.on("click", function (e) {
    activeList.removeClass("active");
    switch (activeList.attr("id")) {
        case "chatbot-menu":
            $("#answer-menu img").attr("src", "/public/assets/icon/Message_white.png");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "chatbot-menu":
            $("#answer-menu img").attr("src", "/public/assets/icon/Message.png");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            break;
    }
    activeList = $(".aside-menus > .active");
})