const fileMenuInner = $(".file-menu-inner");
const mobileModifyBtn = $("#mobile-modify");
const mobileAddBtn = $("#mobile-add");
const mobileRemoveBtn = $("#mobile-remove");

fileMenuBtn.on("click", function () {
    if (fileMenuInner.hasClass("close")) {
        fileMenuInner.removeClass("close");
    } else {
        fileMenuInner.addClass("close");
    }
})

mobileModifyBtn.click(() => {
//     파일 수정 버튼 클릭
})

mobileAddBtn.click(() => {
//     파일 추가 버튼 클릭
})

mobileRemoveBtn.click(() => {
//     파일 삭제 버튼 클릭
})