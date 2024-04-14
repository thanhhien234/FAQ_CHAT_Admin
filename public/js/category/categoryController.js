const category = new Category();

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
    if (Object.keys(category.categoryData).includes(newCategoryName)) {
        alert("카테고리 이름이 중복되었습니다. 다시 입력해주세요");
        return;
    }
    category.modifyCategory(oldCategoryName, newCategoryName)
    .then(() => {
        alert("카테고리가 수정되었습니다.");
        category.renderCategory();
        $('.spinner-container').css('display', 'none');
        $('#categoryModal').modal('hide')
    });
});

/* 취소 button*/
$(document).on('click', '#categoryCancelBtn', function() {
    const addCategoryInput = document.querySelector('.add-category-input');
    if (addCategoryInput) {
        addCategoryInput.textContent = '카테고리 추가';
    }
    $('#categoryModal').modal('hide');
});



$(document).ready(function() {
    function moveCategorySelect() {
        if ($(window).width() < 900) { // Create gap between thead and tbody of mobile-fileTable
            var categorySelectWrapper = $('.category-select-wrapper').detach();
            $('#mobile-fileTable').find('thead').after('<div class="gap"></div>', categorySelectWrapper);
        } else {  // back to original position
            $('.category-select-wrapper').insertBefore('.file-wrapper');
        }
    }
    moveCategorySelect();
    $(window).resize(function() {
        moveCategorySelect();
    });
});

function handleCategoryChange() {
    let selectElement = document.getElementById("categorySelect");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let categoryName = selectedOption.value;
    if (categoryName === "all") {
        category.fileListSearch();
    } else {
        category.searchCategory(categoryName);
    }
}

