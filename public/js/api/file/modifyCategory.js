async function modifyCategory(old_category, new_category) {
  $('.spinner-container').css('display', 'block');
  await $.ajax({
    url: config.fileServer + "/api/auth/category?oldCategory=" + old_category + "&newCategory=" + new_category,
    type: "PATCH",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    success: function (res) {
      categoryAllSearch()
      $('.spinner-container').css('display', 'none');
    }
  })
}