const fileMenuInner = $(".file-menu-inner");
const mobileModifyBtn = $("#mobile-modify");
const mobileAddBtn = $("#mobile-add");
const mobileRemoveBtn = $("#mobile-remove");
const mobileCategoryBtn = $("#mobile-category");

fileMenuBtn.on("click", function () {
    if (fileMenuInner.hasClass("close")) {
        fileMenuInner.removeClass("close");
    } else {
        fileMenuInner.addClass("close");
    }
})

mobileModifyBtn.click(() => {
    $('#file-modify-button').click();
})

mobileAddBtn.click(() => {
    $('#file-add-button').click();
})

mobileRemoveBtn.click(() => {
    $('#file-remove-button').click();
})
mobileCategoryBtn.click(() => {
    $('#file-category-button').click();
})