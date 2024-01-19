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
        $(".main-content .name").text(`${chatName} (${chatStudentId})`);
        $(".main-content .instructor-message-container").empty(); 
        $(".main-content").show();
        searchChat(chatStudentId);
        lastClicked = currentClicked;
    }
});

