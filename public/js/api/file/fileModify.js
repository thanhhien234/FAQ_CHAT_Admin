async function modifyFile(fileId, name) {
    await $.ajax({
        url: config.fileServer + '/api/auth/file?' + 'fileId=' + fileId + '&name=' + name,
        type: 'PATCH',
        headers: {
            Authorization: "Bearer " + getCookie("accessToken")
        },
        success: function(response) {
            console.log('Modify File success');
        },
        error: function(err) {
            console.error(err);
        }
    });
}