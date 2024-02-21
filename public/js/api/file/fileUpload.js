async function uploadFile(file, fileName, category) {
    $('#loadingModal').modal('show');
    let formData = new FormData();
    formData.append('multipartFile', file, fileName);
    await $.ajax({
        url: config.fileServer + "/api/auth/file?fileName=" + fileName + "&category=" + category,
        type: 'POST',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        data: formData,
        processData: false, 
        contentType: false,

        success: function (response) {
            fileListSearch(currentPage, pageSize)
            .then(() => {
                $("#categorySelect").change();
            });;
            $('#loadingModal').modal('hide');
        },
        error: function (err) {
            alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
    });
}