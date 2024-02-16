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
    }
  })
}