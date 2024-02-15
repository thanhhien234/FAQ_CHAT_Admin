let totalFiles = 0;
const categoryColorMap = {};
const categoryAllData = {};

function getCategoryColor(index) {
    const colors = ['#E3F1D4','#FFE5E5','#F7F5BA','#E2D7EE','#BADAF7','#FFBCC4','#CDBA9E','#BAF7F4','#FFDB96'];
    return colors[index % colors.length];
}
function renderCategorySelect(res){
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '<option value="all" selected>최근 게시된 순으로 보기</option>';
    res.forEach(function(category,index) {
        categoryAllData[category.name] = category.count;
        totalFiles += category.count;
        const option = document.createElement('option');
        option.value = category.name; 
        option.textContent = category.name;
        categorySelect.appendChild(option);

        // Assign color for each category 
        if (category.count !== 0) {
            const color = getCategoryColor(index);
            categoryColorMap[category.name] = color;
        }
    });
}

function renderChangeCategorySelect(res){
    const changeCategorySelect = document.getElementById('changeCategorySelect');
    changeCategorySelect.innerHTML = '<option value="" disabled selected hidden>변경할 카테고리</option>';
    res.forEach(function(category, index) {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        changeCategorySelect.appendChild(option);
    });
}
function renderCategoryItemsContainer(res) {
    const categoryItemsContainer = document.getElementById('categoryItemsContainer');

    res.forEach(function(category, index) {
        const categoryItemContainer = document.createElement('div');
        categoryItemContainer.classList.add('category-item-container');

        const categoryTextName = document.createElement('span');
        categoryTextName.classList.add('category-text-name');
        categoryTextName.textContent = category.name;

        const deleteCategoryBtn = document.createElement('button');
        deleteCategoryBtn.type = 'button';
        deleteCategoryBtn.classList.add('delete-category-btn');

        const deleteIcon = document.createElement('img');
        deleteIcon.src = '/public/assets/icon/deleteIcon.png';

        deleteCategoryBtn.appendChild(deleteIcon);
        categoryItemContainer.appendChild(categoryTextName);
        categoryItemContainer.appendChild(deleteCategoryBtn);
        categoryItemsContainer.appendChild(categoryItemContainer);
    });

    // "카테고리 추가" button
    const addCategoryWrapper = document.createElement('div');
    addCategoryWrapper.classList.add('add-wrapper');

    const addCategoryInput = document.createElement('input');
    addCategoryInput.type = 'text';
    addCategoryInput.placeholder = '카테고리 추가';
    addCategoryInput.classList.add('add-category-input');
    const placeholderWidth = addCategoryInput.placeholder.length * 10 + 30;  //size as placeholder at first
    addCategoryInput.style.width = placeholderWidth + 'px';

    addCategoryInput.addEventListener('input', function() {
        this.style.width = (this.value.length * 8 + 20) + 'px';   //dynamic size
    });

    addCategoryWrapper.appendChild(addCategoryInput);
    categoryItemsContainer.appendChild(addCategoryWrapper);

}


async function categoryAllSearch() {
    await $.ajax({
        url: config.fileServer + `/api/category/all`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            renderCategorySelect(res);  //into main screen select
            renderChangeCategorySelect(res); //into categoryModal select
            renderCategoryItemsContainer(res); //into categoryModal's body
        },
        error: function (err) {
            alert('카테고리 조회 중 오류가 발생했습니다.');
        }
    })
}
categoryAllSearch();

