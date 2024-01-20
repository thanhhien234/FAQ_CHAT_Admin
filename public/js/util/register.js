const nameInput = $("#name-input");
const studentNumInput = $("#student-num-input");
const emailInput = $("#email-input");
const codeInput = $("#code-input");
const sendBtn = $("#send-code-btn");
const timeRemain = $(".time-remain");
const agreeCheck = $("#agree-check");
const agreeCheckLabel = $(".agree-box label");
const checkImg = $(".agree-box label img");
const submitBtn = $("#submit-btn");

let nameState = false;
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

nameInput.on("change", function () {
    const checkImg = $(".name-box .input-check");
    if(nameInput.val().length > 0) {
        nameState = true;
        checkImg.show();
    } else {
        nameState = false;
        checkImg.hide();
    }
})

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
    if (emailInput.val().endsWith('@stu.kmu.ac.kr')) {
        checkImg.show();
        emailState = true;
    } else {
        checkImg.hide();
        emailState = false;
    }
})

codeInput.on("change", function () {
    codeState = codeInput.val().length === 0;
})

sendBtn.click(function (e) {
    e.preventDefault();
    if (emailState) {
        sendVerificationCode(emailInput.val())
            .then(() => {
                timeRemain.show();
                $(".code-box .code-description").show();
                leftTime = 10 * 60 * 1000;
                sendBtn.addClass(".active");
                leftTimer = setInterval(function () {
                    if (leftTime < 0) {
                        clearInterval(leftTimer);
                        timeRemain.html(`0분 0초`)
                    } else {
                        let min = Math.floor(leftTime / (60 * 1000));
                        let sec = Math.floor(leftTime % ((60 * 1000)) / 1000);
                        timeRemain.html(`${min}분 ${sec}초`)
                        leftTime -= 1000;
                    }
                }, 1000);
            });
    } else {
        alert("학교 이메일을 입력해주세요.");
    }
})

submitBtn.click(function (e) {
    e.preventDefault();
    if (!nameState) {
        alert("이름을 입력해주세요.");
    } else if (!studentNumState) {
        alert("학번을 입력해주세요.");
    } else if (!emailState) {
        alert("학교 이메일을 입력해주세요.");
    } else if (!codeState) {
        alert("인증번호를 입력해주세요.");
    } else if (!agreeState) {
        alert("약관에 동의해주세요.");
    } else {
        const studentId = studentNumInput.val();
        const name = nameInput.val();
        const email = emailInput.val();
        const code = codeInput.val();

        verifyCode(email, code)
            .then(() => {
                authRegister(studentId, name, email);
            })
            .catch(() => {
                alert("잘못된 인증번호입니다.")
            });
    }
});