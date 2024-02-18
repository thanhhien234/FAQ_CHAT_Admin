let currentPage;
let pageSize;

function handleCategoryChange() {
    currentPage = 0;
    let selectElement = document.getElementById("categorySelect");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let categoryName = selectedOption.value;
    if (categoryName === "all") {
        pageSize= totalFiles;
        fileListSearch(currentPage, pageSize);
    } else {
        pageSize= categoryAllData[categoryName];
        if(pageSize === 0){
            renderFileTableData([])
        }
        else{
            categorySearch(currentPage, pageSize, categoryName);
        }
        
    }
}

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


