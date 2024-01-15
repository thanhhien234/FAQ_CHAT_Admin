$(document).on('change', '.file-container input[type="checkbox"]', function() {
    const isChecked = $(this).is(':checked');
    if (isChecked) {
        $(this).next('label').css('background-image', 'url(/public/assets/icon/checkBox.png)');
    } else {
        $(this).next('label').css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
    }
});






  





