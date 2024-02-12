let totalFiles = 0;
const categoryColorMap = {};
const categoryAllData = {};

function getCategoryColor(index) {
    const colors = ['#E3F1D4','#FFE5E5','#E2D7EE', '#F2F1D4','#FBC0C0', '#D4E3F1', '#E3F1D4', '#D4D4D4', '#ADB0F4', '#CDFC9A'];
    return colors[index % colors.length];
}
async function categoryAllSearch() {
    await $.ajax({
        url: config.fileServer + `/api/category/all`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
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
        },
        error: function (err) {
            alert('카테고리 조회 중 오류가 발생했습니다.');
        }
    })
}
categoryAllSearch();