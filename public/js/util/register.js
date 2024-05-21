const studentNumInput = $("#student-num-input");
const emailInput = $("#email-input");
const codeInput = $("#code-input");
const sendBtn = $("#send-code-btn");
const timeRemain = $(".time-remain");
const agreeCheck = $("#agree-check");
const agreeCheckLabel = $(".agree-box label");
const checkImg = $(".agree-box label img");
const submitBtn = $("#submit-btn");
const cancelBtn = $("#cancel-btn");
const sendLoading = $("#send-code-btn .spinner-border");
const informationTitle = $(".information-box-title");
const informationContent = $(".information-box-content");
const agreeBox = $(".agree-box");

let studentNumState = false;
let emailState = false;
let codeState = false;
let agreeState = false;

let leftTime;
let leftTimer;

agreeCheckLabel.click(function () {
    let checked = agreeCheck.is(":checked");
    if (checked) {
        agreeCheckLabel.addClass("checked");
        checkImg.attr("src", "/public/assets/icon/Check_active.png");
        agreeState = true;
    } else {
        agreeCheckLabel.removeClass("checked");
        checkImg.attr("src", "/public/assets/icon/Check.png");
        agreeState = false;
    }
})

agreeCheck.click();

studentNumInput.on("change", function () {
    const checkImg = $(".student-num-box .input-check");
    if (studentNumInput.val().length > 0) {
        checkImg.show();
        studentNumState = true;
    } else {
        checkImg.hide();
        studentNumState = false;
    }
})

emailInput.on("change", function () {
    const checkImg = $(".email-box .input-check");
    if (emailInput.val().endsWith('@stu.kmu.ac.kr') || emailInput.val().endsWith('@kmu.kr')) {
        checkImg.show();
        emailState = true;
    }
    else {
        checkImg.hide();
        emailState = false;
    }
})

submitBtn.click(function (e) {
    e.preventDefault();
    if (!studentNumState) {
        alert("학번을 입력해주세요.");
    } else if (!emailState) {
        alert("학교 이메일을 입력해주세요.");
    } else if (!agreeState) {
        alert("약관에 동의해주세요.");
    } else {
        const studentId = studentNumInput.val();
        const email = emailInput.val();

        authRegister(email, studentId);
    }
});
cancelBtn.click(function (e) {
    e.preventDefault();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("isActive");
    location.href = "/login.html";
});

informationTitle.click(function () {
    $(this).toggleClass('active');
    informationContent.toggle();
    agreeBox.toggle();
});
