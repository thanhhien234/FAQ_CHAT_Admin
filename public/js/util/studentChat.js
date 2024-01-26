let currentStudentId = null; // used in chatting.js

$(".main-content").hide();
let lastClicked = null;
$(document).on('click', '.list-inner', function() {
    const currentClicked = this;
    if (currentClicked === lastClicked) {
        $(".main-content").hide();
        lastClicked = null;
    } else {
        const chatName = $(this).closest('li').data('name');
        const chatStudentId = $(this).closest('li').data('studentid');
        currentStudentId = chatStudentId
        $(".main-content .name").text(`${chatName} (${chatStudentId})`);
        $(".main-content").show();
        searchChat(chatStudentId)
        lastClicked = currentClicked;
    }
});

$(".back-arrow").click(() => {
    $(".main-content").hide();
})

