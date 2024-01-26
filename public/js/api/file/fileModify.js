async function modifyFile(fileId, name) {
    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + 'fileId=' + fileId + '&name=' + name,
        type: 'PATCH',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function(response) {
            fileListSearch(currentPage, pageSize);
        },
        error: function(err) {
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
    });
}