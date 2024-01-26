async function uploadFile(file, fileName) {
    $('#loadingModal').modal('show');
    let formData = new FormData();
    formData.append('multipartFile', file, fileName);
    await $.ajax({
        url: config.fileServer + "/api/auth/file?fileName=" + fileName,
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: formData,
        processData: false, 
        contentType: false,

        success: function (response) {
            fileListSearch(currentPage, pageSize);
            $('#loadingModal').modal('hide');
        },
        error: function (err) {
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
    });
}