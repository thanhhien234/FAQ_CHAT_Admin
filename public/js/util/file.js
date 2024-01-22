//select file
let checkedFileIds = [];
let firstFilename = null;

function handleCheckbox(checkbox, fileName) {
    const isChecked = $(checkbox).prop("checked");

    if (isChecked) {
        $(checkbox).next('label').css('background-image', 'url(/public/assets/icon/checkBox.png)');
        const fileId = $(checkbox).attr("id");
        $(`#mobile-fileTable tbody #${fileId}`).prop("checked", true);
        $(`#mobile-fileTable tbody #${fileId}`).next('label').css('background-image', 'url(/public/assets/icon/checkBox.png)');
        if (!checkedFileIds.includes(fileId)) {
            checkedFileIds.push(fileId);
        }
        firstFilename = fileName
    } else {
        $(checkbox).next('label').css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
        const fileId = $(checkbox).attr("id");
        $(`#mobile-fileTable tbody #${fileId}`).prop("checked", false);
        $(`#mobile-fileTable tbody #${fileId}`).next('label').css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
        checkedFileIds = checkedFileIds.filter(id => id !== fileId);
    }
    console.log("Checked FileIds:", checkedFileIds);
}


//delete file
$(document).on('click', '#file-remove-button', function() {
    if (checkedFileIds.length > 0) {
        deleteFile(checkedFileIds);
        checkedFileIds = [];
    } else {
        alert("파일을 선택해주세요.")
    }
});




//modify file
$(document).on('click', '#file-modify-button', function() {
    if (checkedFileIds.length === 1) {
        const selectedFile = checkedFileIds[0];
        $('#newFileNameInput').attr('placeholder', firstFilename);
        $('#modifyFileModal').modal('show');
    } else {
        alert("파일을 하나만 선택해주세요.");
    }
});
$(document).on('click', '#saveChangesBtn', function() {
    const newFileName = $('#newFileNameInput').val();
    modifyFile(checkedFileIds[0], newFileName);
    $('#modifyFileModal').modal('hide');
});




//add file
$(document).on('click', '#file-add-button', function () {
    $('#file-input').click();
});
$(document).on('change', '#file-input', function () {
    const fileInput = this;
    const file = fileInput.files[0];

    if (file) {
        const fileName = file.name;
        uploadFile(file, fileName);
    } else {
        alert("파일을 선택해주세요.");
    }
});
