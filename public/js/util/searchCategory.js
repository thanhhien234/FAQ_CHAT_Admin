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
        categorySearch(currentPage, pageSize, categoryName);
    }
}
