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
    categoryItemsContainer.innerHTML = '';

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

        // Call removeCategory.js
        deleteCategoryBtn.addEventListener('click', function() {
            removeCategory(category.name); 
        });

        deleteCategoryBtn.appendChild(deleteIcon);
        categoryItemContainer.appendChild(categoryTextName);
        categoryItemContainer.appendChild(deleteCategoryBtn);
        categoryItemsContainer.appendChild(categoryItemContainer);
    });

    // "카테고리 추가" button
    const addCategoryWrapper = document.createElement('div');
    addCategoryWrapper.classList.add('add-wrapper');

    const addCategoryInput = document.createElement('div');
    addCategoryInput.textContent = '카테고리 추가';
    addCategoryInput.classList.add('add-category-input');
    addCategoryInput.setAttribute('contenteditable', 'true');
    addCategoryInput.addEventListener('click', function() {
        if (this.textContent.trim() === '카테고리 추가') {
            this.textContent = ' ';
            this.focus();
        }
    });
    const addCategoryBtn = document.createElement('button');
    addCategoryBtn.type = 'button';
    addCategoryBtn.classList.add('add-category-btn');
    const addCategoryIcon = document.createElement('img');
    addCategoryIcon.src = '/public/assets/icon/addCategoryBtn.png';
    
    // Call addCategory.js
    addCategoryBtn.addEventListener('click', function() {
        const categoryName = addCategoryInput.textContent.trim();
        if (categoryName && categoryName !== '카테고리 추가') {
            const existingCategoryNames = res.map(item => item.name.trim());
            if (existingCategoryNames.includes(categoryName)) {
                alert("카테고리의 이름이 중복되었습니다");
                addCategoryInput.textContent = '카테고리 추가';
                return;
            }
            addCategory(categoryName)
            .then(() => {
                alert("카테고리가 추가되었습니다.");
                categoryAllSearch();
                $('.spinner-container').css('display', 'none');
            });
        }
        else {
            addCategoryInput.textContent = '카테고리 추가';
        }
    });
    addCategoryInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const categoryName = this.textContent.trim();
            if (categoryName && categoryName !== '카테고리 추가') {
                const existingCategoryNames = res.map(item => item.name.trim());
                if (existingCategoryNames.includes(categoryName)) {
                    alert("카테고리의 이름이 중복되었습니다");
                    addCategoryInput.textContent = '카테고리 추가';
                    return;
                }
                addCategory(categoryName)
                .then(() => {
                    alert("카테고리가 추가되었습니다.");
                    categoryAllSearch();
                    $('.spinner-container').css('display', 'none');
                });
            }
            else {
                addCategoryInput.textContent = '카테고리 추가';
            }
        }
    });

    addCategoryBtn.appendChild(addCategoryIcon);
    addCategoryWrapper.appendChild(addCategoryInput);
    addCategoryWrapper.appendChild(addCategoryBtn);
    categoryItemsContainer.appendChild(addCategoryWrapper);
}

function renderCategoryModifyItemsContainer(res) {
    const categoryItemsContainer = document.getElementById('categoryModifyItemsContainer');
    categoryItemsContainer.innerHTML = '';
    res.forEach(function(category) {
        const categoryItemContainer = document.createElement('div');
        categoryItemContainer.classList.add('category-modify-item-container');

        const categoryTextName = document.createElement('span');
        categoryTextName.classList.add('category-modify-text-name');
        categoryTextName.textContent = category.name;

        categoryItemContainer.appendChild(categoryTextName);
        categoryItemsContainer.appendChild(categoryItemContainer);
    });
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
            renderCategoryModifyItemsContainer(res); // into modifyFileModal's body
        },
        error: function (err) {
            alert('카테고리 조회 중 오류가 발생했습니다.');
        }
    })
}
//categoryAllSearch();

