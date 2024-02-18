async function removeCategory(category) {
  $('.spinner-container').css('display', 'block');
  await $.ajax({
    url: config.fileServer + "/api/auth/category?category=" + category,
    type: "DELETE",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    success: function (res) {
      categoryAllSearch();
      $('.spinner-container').css('display', 'none');
    },
    error: function(xhr) {
      if (xhr.status === 400) {
        alert("파일 있는 카테고리를 삭제할 수 없습니다");
        $('.spinner-container').css('display', 'none');
      } 
    }
  })
}