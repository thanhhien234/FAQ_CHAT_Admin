const file = new File();
//select file
let checkedFileIds = [];
let firstFilename = null;
let lastFile= null;
let fileInfos = [];

function handleCheckbox(checkbox, fileName) {
    const isChecked = $(checkbox).prop("checked");

    if (isChecked) {
        $(checkbox).next('label').css('background-image', 'url(/public/assets/icon/checkBox.png)');
        const fileId = $(checkbox).attr("id");
        $(`#mobile-fileTable tbody #${fileId}`).prop("checked", true);
        $(`#mobile-fileTable tbody #${fileId}`).next('label').css('background-image', 'url(/public/assets/icon/checkBox.png)');
        if (!checkedFileIds.includes(fileId)) {
            checkedFileIds.push(fileId);
            fileInfos.push({id: fileId, name: fileName});
        }
        firstFilename = fileName
    } else {
        $(checkbox).next('label').css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
        const fileId = $(checkbox).attr("id");
        $(`#mobile-fileTable tbody #${fileId}`).prop("checked", false);
        $(`#mobile-fileTable tbody #${fileId}`).next('label').css('background-image', 'url(/public/assets/icon/uncheckBox.png)');
        checkedFileIds = checkedFileIds.filter(id => id !== fileId);
        fileInfos = fileInfos.filter(item => item.id !== fileId);
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
        file.deleteFile(checkedFileIds);
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
        $('#newFileNameInput').val(fileInfos.find(item => item.id === checkedFileIds[0]).name);
        $('#newFileNameInput').css('color', '#929FAD');
        $('#modifyFileModal').modal('show')
    } else {
        alert("파일을 하나만 선택해주세요.");
    }
});
$(document).on('click', '#saveChangesBtn', function() {
    const newFileName = $('#newFileNameInput').val();
    if (checkedFileIds.length === 1) {
        file.modifyFile(checkedFileIds[0], newFileName);
        $('#modifyFileModal').modal('hide');
        checkedFileIds = [];
    }
    else{
        //select category
        const selectedCategory = $('.category-modify-item-container.selected').text().trim();
        if (!selectedCategory) {
            alert("카테고리를 선택해주세요.");
            return;
        }
        file.uploadFile(lastFile, newFileName, selectedCategory);
        category.renderCategory();
        $('#modifyFileModal').modal('hide');
    }
    $('#file-input').val(''); 
    
});
$(document).on('click', '#cancelBtn', function() {
    $('#modifyFileModal').modal('hide');
    $('#file-input').val(''); 
    $('.category-modify-item-container').removeClass('selected');
    lastFile = null;
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
    lastFile = this.files[0];
    if (file) {
        const fileName = lastFile.name;
        $('#newFileNameInput').val(fileName); 
        $('#modifyFileModal').modal('show'); 
    } else {
        alert("파일을 선택해주세요.");
    }
});

