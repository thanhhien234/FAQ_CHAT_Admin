class Category {
    constructor(){
        this.categoryData = [];
        this.currentCategoryData = [];
        this.colors = ['#E3F1D4','#FFE5E5','#F7F5BA','#E2D7EE','#BADAF7','#FFBCC4','#CDBA9E','#BAF7F4','#FFDB96'];
    }
    async addCategory(category) {
        $('.spinner-container').css('display', 'block');
        await $.ajax({
          url: config.fileServer + "/api/auth/category?category=" + category,
          type: "POST",
          headers: {
            Authorization: "Bearer " + getCookie("accessToken")
          },
          error: function(err) {
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            $('.spinner-container').css('display', 'none');
          }
        })
    }
    async modifyCategory(old_category, new_category) {
        $('.spinner-container').css('display', 'block');
        await $.ajax({
          url: config.fileServer + "/api/auth/category?oldCategory=" + old_category + "&newCategory=" + new_category,
          type: "PATCH",
          headers: {
            Authorization: "Bearer " + getCookie("accessToken")
          }
        })
    }
    async deleteCategory(category) {
        $('.spinner-container').css('display', 'block');
        await $.ajax({
          url: config.fileServer + "/api/auth/category?category=" + category,
          type: "DELETE",
          headers: {
            Authorization: "Bearer " + getCookie("accessToken")
          },
          error: function(xhr) {
            if (xhr.status === 400) {
              alert("파일 있는 카테고리를 삭제할 수 없습니다");
              $('.spinner-container').css('display', 'none');
            }
            else {
              alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
              $('.spinner-container').css('display', 'none');
            }
          }
        })
    }
    renderFileData(data){
        $("#fileTable tbody").empty();
        data.forEach(function (file, index) {
            $("#fileTable tbody").append(`
                <tr>
                    <td>
                        <input type="checkbox" onclick="handleCheckbox(this, '${file.fileName}')" id="${file.fileId}">
                        <label for="${file.fileId}"></label>
                    </td>
                    <td>${index + 1}</td>
                    <td>
                        <span class="category-name" style="background-color: ${file.color}">${file.category}</span>
                    </td>
                    <td>${file.fileName}</td>
                    <td>${file.date}</td>
                </tr>
            `);
        });


        /* mobile screen */
        $("#mobile-fileTable tbody").empty();
        data.forEach(function (file, index) {
            $("#mobile-fileTable tbody").append(`
                <tr>
                    <td>
                        <input type="checkbox" onclick="handleCheckbox(this, '${file.fileName}')" id="${file.fileId}">
                        <label for="${file.fileId}"></label>
                    </td>
                    <td>${index + 1}</td>
                    <td>
                        <div class="file-info">
                            <div>
                                <span class="category-name" style="background-color: ${file.color}">${file.category}</span>
                            </div>
                            <div>${file.fileName}</div>
                            <div>${file.date}</div>
                        </div>
                    </td>
                </tr>
            `);
        });
    }
    async fileListSearch() { 
        await $.ajax({
            url: config.fileServer + `/api/file/all`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success: (res) => {
                this.currentCategoryData = res.map((file) => {
                    let categoryColor;
                    for (let i = 0; i < this.categoryData.length; i++) {
                        if (this.categoryData[i].categoryName === file.category) {
                            categoryColor = this.categoryData[i].color;
                            break; 
                        }
                    }
                    return {
                        category: file.category,
                        color: categoryColor,
                        fileId: file.id,
                        fileName: file.name,
                        date: new Date(file.created_at).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            weekday: "long"
                        })
                    };
                });
                this.renderFileData(this.currentCategoryData);
            },
            error: function (err) {
                alert('파일 조회 중 오류가 발생했습니다.');
            }
        })
    }
    async searchCategory(category) { 
        await $.ajax({
            url: config.fileServer + `/api/file/list?category=${category}`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success:(res) => {
                const filteredFiles = this.currentCategoryData.filter(file => file.category === category);
                this.renderFileData(filteredFiles);
            },
            error: function (err) {
                alert('카테고리 조회 중 오류가 발생했습니다.');
            }
        })
    }
    async renderCategory() {
        await $.ajax({
            url: config.fileServer + `/api/category/all`,
            type: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("accessToken")
            },
            success:(res) => {
                this.categoryData = res.map((category,index) => {
                    return {
                        color: this.colors[index % this.colors.length],
                        categoryName: category.name,
                        filesNum: category.count
                    };
                });
                this.renderChangeCategorySelect();
                this.renderCategorySelect();
                this.renderCategoryItemsContainer();
                this.renderCategoryModifyItemsContainer();
                $("#categorySelect").change();
            },
            error: function (err) {
                alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
            }
        })
    }
    renderCategorySelect(){
        const categorySelect = document.getElementById('categorySelect');
        categorySelect.innerHTML = '<option value="all" selected>최근 게시된 순으로 보기</option>';
        this.categoryData.forEach(function(category,index) {
            const option = document.createElement('option');
            option.value = category.categoryName; 
            option.textContent = category.categoryName;
            categorySelect.appendChild(option);
        });
    }
    renderChangeCategorySelect(){
        const changeCategorySelect = document.getElementById('changeCategorySelect');
        changeCategorySelect.innerHTML = '<option value="" disabled selected hidden>변경할 카테고리</option>';
        this.categoryData.forEach(function(category, index) {
            const option = document.createElement('option');
            option.value = category.categoryName;
            option.textContent = category.categoryName;
            changeCategorySelect.appendChild(option);
        });
    }
    renderCategoryItemsContainer() {  
        const categoryItemsContainer = document.getElementById('categoryItemsContainer');
        categoryItemsContainer.innerHTML = '';
    
        this.categoryData.forEach(function(category, index) {
            const categoryItemContainer = `
                <div class="category-item-container">
                    <span class="category-text-name">${category.categoryName}</span>
                    <button class="delete-category-btn" type="button">
                        <img src="/public/assets/icon/deleteIcon.png" />
                    </button>
                </div>`; 
            categoryItemsContainer.insertAdjacentHTML('beforeend', categoryItemContainer);
        });
        categoryItemsContainer.querySelectorAll('.delete-category-btn').forEach(button => {
            button.addEventListener('click', () => {
                const categoryName = button.closest('.category-item-container').querySelector('.category-text-name').textContent;
                this.deleteCategory(categoryName)
                .then(() => {
                    this.renderCategory();
                    $('.spinner-container').css('display', 'none');
                });
            });
        });
        

        // "카테고리 추가" button
        const addCategoryWrapper = `
            <div class="add-wrapper">
                <div class="add-category-input" contenteditable="true">카테고리 추가</div>
                <button class="add-category-btn" type="button">
                    <img src="/public/assets/icon/addCategoryBtn.png" />
                </button>
            </div>`;
        categoryItemsContainer.insertAdjacentHTML('beforeend', addCategoryWrapper);
        const addCategoryInput = categoryItemsContainer.querySelector('.add-category-input');
        const addCategoryBtn = categoryItemsContainer.querySelector('.add-category-btn');
        addCategoryInput.addEventListener('click', function() {
            if (this.textContent.trim() === '카테고리 추가') {
                this.textContent = ' ';
                this.focus();
            }
        });
        // Call addCategory.js
        addCategoryBtn.addEventListener('click', function() {
            const categoryName = addCategoryInput.textContent.trim();
            if (categoryName && categoryName !== '카테고리 추가') {
                const existingCategoryNames = this.categoryData.map(item => item.categoryName.trim());
                if (existingCategoryNames.includes(categoryName)) {
                    alert("카테고리의 이름이 중복되었습니다");
                    addCategoryInput.textContent = '';
                    return;
                }
                this.addCategory(categoryName)
                .then(() => {
                    this.renderCategory();
                    $('.spinner-container').css('display', 'none');
                });
            }
            else {
                addCategoryInput.textContent = '카테고리 추가';
                addCategoryInput.blur();
            }
        }.bind(this));
        addCategoryInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                addCategoryBtn.click();
            }
        });
    }
    renderCategoryModifyItemsContainer() {
        const categoryItemsContainer = document.getElementById('categoryModifyItemsContainer');
        categoryItemsContainer.innerHTML = '';
        this.categoryData.forEach(category => {
            categoryItemsContainer.innerHTML += `
                <div class="category-modify-item-container">
                    <span class="category-modify-text-name">${category.categoryName}</span>
                </div>
            `;
        });
    }
}
