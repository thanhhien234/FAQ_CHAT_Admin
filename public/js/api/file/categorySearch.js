async function categorySearch(page,pageSize,category) {   //search each category
    await $.ajax({
        url: config.fileServer + `/api/file/list?page=${page}&pageSize=${pageSize}&category=${category}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function (res) {
            renderFileTableData(res)
        },
        error: function (err) {
            alert('카테고리 조회 중 오류가 발생했습니다.');
        }
    })
}