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
            console.log('File Upload Success:', response);
        },
        error: function (err) {
            console.error('File Upload Error:', err);
        }
    });
}