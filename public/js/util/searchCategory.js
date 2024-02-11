let currentPage;
let pageSize;

function handleCategoryChange() {
    currentPage = 0;
    console.log('current',currentPage)
    if (window.innerWidth <= 900) {
        pageSize = 5;
    } else {
        pageSize = 10;
    } 
    let selectElement = document.getElementById("categorySelect");
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let categoryName = selectedOption.value;
    if (categoryName === "all") {
        fileListSearch(currentPage, pageSize);
        addPaging(totalFiles / pageSize,categoryName);
    } else {
        categorySearch(currentPage, pageSize, categoryName);
        addPaging(categoryAllData[categoryName]/pageSize,categoryName);
    }
    $(`.pageButton[data-page="0"]`).click();  // initialize
    $(`.mobilePageButton[data-page="0"]`).click();// initialize
}

function addPaging(totalPages,categoryName) {
    $(".myPaging, .myMobilePaging").remove();

    const paging = $("<div class='myPaging'></div>");
    const mobilePaging = $("<div class='myMobilePaging'></div>");

    for (let i = 0; i < totalPages; i++) {
        paging.append(`<button class="pageButton" data-page="${i}">${i + 1}</button>`);
        mobilePaging.append(`<button class="mobilePageButton" data-page="${i}">${i + 1}</button>`);
    }

    paging.on("click", ".pageButton", function () {
        const newPage = parseInt($(this).data("page"));
        if (newPage !== currentPage) {
            currentPage = newPage;
            if (categoryName === "all") {
                fileListSearch(currentPage, pageSize);
            } else {
                categorySearch(currentPage, pageSize, categoryName);
            }
        }
        currentPageButton();
    });

    mobilePaging.on("click", ".mobilePageButton", function () {
        const newPage = parseInt($(this).data("page"));
        if (newPage !== currentPage) {
            currentPage = newPage;
            if (categoryName === "all") {
                fileListSearch(currentPage, pageSize);
            } else {
                categorySearch(currentPage, pageSize, categoryName);
            }
        }
        currentPageButton();
    });

    $("#fileTable").after(paging);
    $("#mobile-fileTable").after(mobilePaging);
}

function currentPageButton() {
    $(".pageButton").removeClass("current");
    $(`.pageButton[data-page="${currentPage}"]`).addClass("current");
    $(".mobilePageButton").removeClass("current");
    $(`.mobilePageButton[data-page="${currentPage}"]`).addClass("current");
}
