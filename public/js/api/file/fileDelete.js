async function deleteFile(fileIdList) {
    $('#loadingModal').modal('show');

    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + fileIdList.map(id => `fileIdList=${id}`).join('&'),
        type: 'DELETE',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },       
        success: function(response) {
            fileListSearch(currentPage, pageSize);
            $('#loadingModal').modal('hide');
        },
        error: function(err) {
            alert('파일 삭제는 실패했습니다')
        }
    });
}