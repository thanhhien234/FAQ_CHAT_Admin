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
            alert('파일 수정은 실패했습니다')
        }
    });
}