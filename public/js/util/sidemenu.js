const toggleBtn = $(".aside-toggle");
const sideBar = $("aside");
const menuList = $(".aside-menus > li");
let activeList = $(".aside-menus > .active");
const listRightContent = $("li > .aside-menus-item-right");
const chatList = $(".aside-chat-lists");
const fileMenus = $(".file-menu-container");
const fileMenuBtn = $("#menu-open-button");
const instructorContainer = $(".main-content-container");
const fileContainer = $(".file-container");

// Mobile Menus
const mobileMenuList = $(".mobile-menu-container > li");
let mobileActiveList = $(".mobile-menu-container > .active");
const mobileFileBtnContainer = $(".mobile-file-button-container");

// Initialize
$(document).ready(function() {
    $("#answer-menu").click();
    if ($(window).width() < 900) { 
        let categorySelectWrapper = $('.category-select-wrapper').detach();
        $('#mobile-fileTable').find('thead').after('<div class="gap"></div>', categorySelectWrapper);
    } else {
        $('.category-select-wrapper').insertBefore('.file-wrapper');
    }
});


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
    mobileActiveList.removeClass("active");
    switch (activeList.attr("id")) {
        case "answer-menu":
            $("#answer-menu img").attr("src", "/public/assets/icon/Message_white.png");
            $("#mobile-answer-menu img").attr("src", "../public/assets/icon/Message_white.png");
            chatList.css("display", "none");
            sideBar.removeClass("chat-mode");
            break;
        case "files-menu":
            $("#files-menu img").attr("src", "/public/assets/icon/file_icon.png");
            $("#mobile-files-menu img").attr("src", "../public/assets/icon/file_icon.png");
            fileMenus.addClass("hide");
            fileMenuBtn.addClass("hide");
            mobileFileBtnContainer.addClass("hide");
            break;
    }
    $(e.currentTarget).addClass("active");
    switch ($(e.currentTarget).attr("id")) {
        case "answer-menu":
            $("#mobile-answer-menu").addClass("active");
            $("#answer-menu img").attr("src", "/public/assets/icon/Message.png");
            $("#mobile-answer-menu img").attr("src", "../public/assets/icon/Message.png");
            setTimeout(function () {
                chatList.css("display", "block");
            }, 500);
            sideBar.addClass("chat-mode");
            chat.renderChatList(0, 20);
            instructorContainer.show();
            instructorContainer.scrollTop(instructorContainer[0].scrollHeight); //scroll to bottom
            fileContainer.hide();
            break;
        case "files-menu":
            $("#mobile-files-menu").addClass("active");
            $("#files-menu img").attr("src", "/public/assets/icon/file_selected_icon.png");
            $("#mobile-files-menu img").attr("src", "../public/assets/icon/file_selected_icon.png");
            fileMenus.removeClass("hide");
            fileMenuBtn.removeClass("hide");
            mobileFileBtnContainer.removeClass("hide");
            instructorContainer.hide();
            category.renderCategory()
            .then(() => {
                fileContainer.show();
                $("#categorySelect").val("all");
                $("#categorySelect").change();
            });
            break;
    }
    activeList = $(".aside-menus > .active");
    mobileActiveList = $(".mobile-menu-container > .active");
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
    mobileActiveList = $(".mobile-menu-container > .active");
})