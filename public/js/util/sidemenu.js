const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatList = $(".aside-chat-lists");
const fileMenus = $(".file-menu-container");
const fileMenuBtn = $("#menu-open-button");
const instructorContainer = $(".main-section");
const fileContainer = $(".file-section");

// Mobile Menus
const mobileMenuList = $(".mobile-menus > li");
let mobileActiveList = $(".mobile-menus > .active");

// Initialize
searchChatList(0, 20);

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
            searchChatList(0, 20);
            instructorContainer.show();
            fileContainer.hide();
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            fileMenus.show();
            fileMenuBtn.css("display", "flex");
            instructorContainer.hide();
            fileContainer.show();
            break;
    }
    activeList = $(".aside-menus > .active");
})

mobileMenuList.on("click", function (e) {
    mobileActiveList.removeClass("active");
    switch (activeList.attr("id")) {
        case "mobile-answer-menu":
            $("#mobile-answer-menu img").attr("src", "../public/assets/icon/Message_white.png");
            break;
        case "mobile-files-menu":
            $("#mobile-files-menu img").attr("src", "../public/assets/icon/file_icon.png");
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "mobile-answer-menu":
            $("#mobile-answer-menu img").attr("src", "../public/assets/icon/Message.png");
            $("#answer-menu").click();
            break;
        case "mobile-files-menu":
            $("#mobile-files-menu img").attr("src", "../public/assets/icon/file_selected_icon.png");
            $("#files-menu").click();
            break;
    }
    mobileActiveList = $(".mobile-menus > .active");
})

$("#answer-menu").trigger("click"); //initially