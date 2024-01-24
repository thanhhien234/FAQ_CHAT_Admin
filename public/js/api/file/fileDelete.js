async function deleteFile(fileIdList) {
    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + fileIdList.map(id => `fileIdList=${id}`).join('&'),
        type: 'DELETE',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },       
        success: function(response) {
            fileListSearch(currentPage, pageSize);
        },
        error: function(err) {
            alert('파일 삭제는 실패했습니다')
        }
    });
}