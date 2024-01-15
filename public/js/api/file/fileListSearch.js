let currentPage = 0;
let pageSize = 10;

async function fileListSearch(page, pageSize) {
    await $.ajax({
        url: config.fileServer + `/api/file/list?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            console.log(res);
            const totalPages = res.fileCount / pageSize;

            $("#fileTable tbody").empty();
            res.fileGetListElementResList.forEach(function (file, index) {
                const formattedDate = new Date(file.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                });

                $("#fileTable tbody").append(`
                    <tr>
                        <td>
                            <input type="checkbox" id="${file.id}">
                            <label for="${file.id}"></label>
                        </td>
                        <td>${index + 1 + pageSize * currentPage}</td>
                        <td>${file.name}</td>
                        <td>${formattedDate}</td>
                    </tr>
                `);
            });
            let emptyRow = pageSize - res.fileGetListElementResList.length;
            for (let i = 0; i < emptyRow; i++) {
                $("#fileTable tbody").append(`<tr><td></td><td></td><td></td><td></td></tr>`);
            }
            addPaging(totalPages); // paging
            currentPageButton(); //underline pageButton's text
        },
        error: function (err) {
            console.error(err);
        }
    })
}


function addPaging(totalPages) {
    $("#myPaging").remove();
    const paging = $("<div id='myPaging'></div>");
    for (let i = 0; i < totalPages; i++) {
        paging.append(`<button class="pageButton" data-page="${i}">${i + 1}</button>`);
    }

    paging.on("click", ".pageButton", function () {  //click on page number
        const newPage = parseInt($(this).data("page"));
        if (newPage !== currentPage) {
            currentPage = newPage;
            fileListSearch(currentPage, pageSize);
        }
    });

    $("#fileTable").after(paging);
}

function currentPageButton() {
    $(".pageButton").removeClass("current");
    $(`.pageButton[data-page="${currentPage}"]`).addClass("current");
}

fileListSearch(currentPage,pageSize);


