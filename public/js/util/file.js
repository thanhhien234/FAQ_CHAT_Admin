//select file
let checkedFileIds = [];
let firstFilename = null;
let file= null;

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
}

function handleAllCheckbox() {
    checkedFileIds = [];
    const isChecked = $('#selectAllCheckbox').prop("checked");
    //check thBox
    const thCheckboxLabel1 = $('#fileTable thead input[type="checkbox"]').next('label');
    const thCheckboxLabel2 = $('#mobile-fileTable thead input[type="checkbox"]').next('label');

    if (isChecked) {
        thCheckboxLabel1.css('background-image', 'url(/public/assets/icon/checkBox.png)');
        thCheckboxLabel2.css('background-image', 'url(/public/assets/icon/checkBox.png)');
    } else {
        thCheckboxLabel1.css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
        thCheckboxLabel2.css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
    }
    //check tdBox
    $('#fileTable tbody input[type="checkbox"]').each(function() {
        const fileId = $(this).attr("id");
        $(this).prop("checked", isChecked);
        $('#mobile-fileTable tbody #' + fileId).prop("checked", isChecked);
        if (isChecked) {
            $(this).next('label').click();
            $('#mobile-fileTable tbody #' + fileId).next('label').click();
        } else {
            $(this).next('label').click();
            $('#mobile-fileTable tbody #' + fileId).next('label').click();
        }
    });
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
    $('.modifyFileFormText').text('파일 수정하기');
    $('.category-container').hide();
    if (checkedFileIds.length === 1) {
        $('#newFileNameInput').val(firstFilename);
        $('#newFileNameInput').css('color', '#929FAD');
        $('#modifyFileModal').modal('show')
    } else {
        alert("파일을 하나만 선택해주세요.");
    }
});
$(document).on('click', '#saveChangesBtn', function() {
    const newFileName = $('#newFileNameInput').val();
    if (checkedFileIds.length === 1) {
        modifyFile(checkedFileIds[0], newFileName);
        $('#modifyFileModal').modal('hide');
        checkedFileIds = [];
    }
    else{
        //select category
        const selectedCategory = $('.category-modify-item-container.selected').text();
        if (!selectedCategory) {
            alert("카테고리를 선택해주세요.");
            return;
        }
        uploadFile(file, newFileName, selectedCategory);
        categoryAllSearch();
        $('#modifyFileModal').modal('hide');
    }
    $('#file-input').val(''); 
    
});
$(document).on('click', '#cancelBtn', function() {
    $('#modifyFileModal').modal('hide');
    $('#file-input').val(''); 
    $('.category-modify-item-container').removeClass('selected');
    file = null;
}); 
$(document).on('click', '#newFileNameInput', function() {
    $('#newFileNameInput').css('color', '#001832');
});

$(document).ready(function() {
    $(document).on('click', '.category-modify-item-container', function() {
        $('.category-modify-item-container').removeClass('selected');
        $(this).addClass('selected');
    });
});






//add file
$(document).on('click', '#file-add-button', function () {
    $('#file-input').click();
    $('.modifyFileFormText').text('파일 업로드하기');
    $('.category-container').show();
});
$(document).on('change', '#file-input', function () {
    const fileInput = this;
    file = fileInput.files[0];
    if (file) {
        const fileName = file.name;
        $('#newFileNameInput').val(fileName); 
        $('#modifyFileModal').modal('show'); 
    } else {
        alert("파일을 선택해주세요.");
    }
});

//click outside modal
$(document).on('click', function(event) {
    const targetId = event.target.id;
    if ($('#modifyFileModal').is(':visible') &&
        targetId === 'file-modify-button' &&
        targetId === 'file-add-button' &&
        !$(event.target).closest('#modifyFileModal').length) {
        $('#cancelBtn').click();
    }
});