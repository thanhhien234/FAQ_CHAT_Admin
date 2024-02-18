$(document).on('click', '#file-category-button', function() {
    $('.category-text-input').val('');
    $('#changeCategorySelect').val('');
    $('#categoryModal').modal('show')
});
 
/* 저장 button */
const saveChangesBtn = document.getElementById('categorySaveChangesBtn');
saveChangesBtn.addEventListener('click', function() {
    const newCategoryName = document.querySelector('.category-text-input').value.trim();
    const oldCategoryName = document.getElementById('changeCategorySelect').value;
    if (!newCategoryName || oldCategoryName === "") {
        $('#categoryModal').modal('hide');
        return;
    }
    modifyCategory(oldCategoryName, newCategoryName);
    alert("카테고리가 수정되었습니다.");
    $('#categoryModal').modal('hide')
});

/* 취소 button*/
$(document).on('click', '#categoryCancelBtn', function() {
    const addCategoryInput = document.querySelector('.add-category-input');
    if (addCategoryInput) {
        addCategoryInput.textContent = '카테고리 추가';
    }
    $('#categoryModal').modal('hide');
});



