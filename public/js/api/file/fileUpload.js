async function uploadFile(file, fileName) {
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
        },
        error: function (err) {
            alert('파일 업로드는 실패했습니다')
        }
    });
}