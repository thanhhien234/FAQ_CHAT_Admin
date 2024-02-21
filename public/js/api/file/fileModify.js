async function modifyFile(fileId, name) {
    $('#loadingModal').modal('show');

    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + 'fileId=' + fileId + '&name=' + name,
        type: 'PATCH',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function(response) {
            fileListSearch(currentPage, pageSize)
            .then(() => {
                $("#categorySelect").change();
            });
            $('#loadingModal').modal('hide');
        },
        error: function(err) {
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
    });
}