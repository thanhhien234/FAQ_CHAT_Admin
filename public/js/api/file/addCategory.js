async function addCategory(category) {
  $('.spinner-container').css('display', 'block');
  await $.ajax({
    url: config.fileServer + "/api/auth/category?category=" + category,
    type: "POST",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken")
    },
    succcess: function (res) {
      categoryAllSearch()
    }
  })
}