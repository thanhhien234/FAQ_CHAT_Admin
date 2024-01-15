const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatList = $(".aside-chat-lists");
const fileMenus = $(".file-menu-container");
const fileMenuBtn = $("#menu-open-button");

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
        case "answer-menu":
            $("#answer-menu img").attr("src", "/public/assets/icon/Message_white.png");
            chatList.css("display", "none");
            sideBar.removeClass("chat-mode");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            fileMenus.hide();
            fileMenuBtn.hide();
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "answer-menu":
            $("#answer-menu img").attr("src", "/public/assets/icon/Message.png");
            setTimeout(function () {
                chatList.css("display", "block");
            }, 500);
            sideBar.addClass("chat-mode");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            fileMenus.show();
            fileMenuBtn.css("display", "flex");
            break;
    }
    activeList = $(".aside-menus > .active");
})