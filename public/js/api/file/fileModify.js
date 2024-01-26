async function modifyFile(fileId, name) {
    $('#loadingModal').modal('show');

    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + 'fileId=' + fileId + '&name=' + name,
        type: 'PATCH',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function(response) {
            fileListSearch(currentPage, pageSize);
            $('#loadingModal').modal('hide');
        },
        error: function(err) {
            alert('파일 수정은 실패했습니다')
        }
    });
}