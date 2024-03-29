let arrImage = [
    './img/bau.png',
    './img/cua.png',
    './img/tom.png',
    './img/ca.png',
    './img/huou.png',
    './img/ga.png',
];
let firstImg = document.getElementById("firstImg");
let secondImg = document.getElementById("secondImg");
let thirdImg = document.getElementById("thirdImg");

let element_bau = document.getElementById("score_bau");
let element_cua = document.getElementById("score_cua");
let element_tom = document.getElementById("score_tom");
let element_ca = document.getElementById("score_ca");
let element_huou = document.getElementById("score_huou");
let element_ga = document.getElementById("score_ga");
let bau, cua, tom, ca, huou, ga;

function onLuckyDraw() {
    //khồng cho thao tác gì khi đang quay kết quả
    document.documentElement.style.pointerEvents = "none"

    let resultsFirst = [], resultsSecond = [], resultsThird = [];

    function imgRandom() {
        //random anhr 1
        let newRandomFirst;
        do {
            newRandomFirst = Math.floor(Math.random() * 6);
        } while (resultsFirst.length > 0 && newRandomFirst === resultsFirst[resultsFirst.length - 1]);

        resultsFirst.push(newRandomFirst);
        firstImg.src = arrImage[newRandomFirst]
        //random anhr 2
        let newRandomSecond;
        do {
            newRandomSecond = Math.floor(Math.random() * 6);
        } while (resultsSecond.length > 0 && newRandomSecond === resultsSecond[resultsSecond.length - 1]);

        resultsSecond.push(newRandomSecond);
        secondImg.src = arrImage[newRandomSecond]
        //random anhr 3
        let newRandomThird;
        do {
            newRandomThird = Math.floor(Math.random() * 6);
        } while (resultsThird.length > 0 && newRandomThird === resultsThird[resultsThird.length - 1]);

        resultsThird.push(newRandomThird);
        thirdImg.src = arrImage[newRandomThird]
    }

    let interval = setInterval(imgRandom, 20);

    setTimeout(function () {
        clearInterval(interval);
        logResult()
        //sau khi có kết quả thì lại được phép thao tác
        document.documentElement.style.pointerEvents = "auto"
    }, 20 * 100);
}

function onChooseImage(type) {
    let totalScore = 0;
    let thisChoice = {};
    if (localStorage.getItem("thisChoice") !== null) {
        thisChoice = JSON.parse(localStorage.getItem("thisChoice"));
    }
    for (let key in thisChoice) {
        totalScore += thisChoice[key];
    }

    if (totalScore < 3) {
        if (thisChoice.hasOwnProperty(type)) {
            thisChoice[type] += 1;
        } else {
            thisChoice[type] = 1;
        }
        localStorage.setItem("thisChoice", JSON.stringify(thisChoice));
        if (type == 'bau') {
            element_bau.textContent = parseInt(element_bau.textContent) + 1;
        }
        if (type == 'cua') {
            element_cua.textContent = parseInt(element_cua.textContent) + 1;
        }
        if (type == 'tom') {
            element_tom.textContent = parseInt(element_tom.textContent) + 1;
        }
        if (type == 'ca') {
            element_ca.textContent = parseInt(element_ca.textContent) + 1;
        }
        if (type == 'huou') {
            element_huou.textContent = parseInt(element_huou.textContent) + 1;
        }
        if (type == 'ga') {
            element_ga.textContent = parseInt(element_ga.textContent) + 1;
        }
    }
}
function onResetData() {
    var scoreSpans = document.querySelectorAll('.score');

    scoreSpans.forEach(function (span) {
        span.textContent = 0;
    });
    localStorage.removeItem("thisChoice")
}
window.onload = onResetData();

function logResult() {
    let totalScore = 0;
    let thisChoice = {};
    let objResult = {}
    if (localStorage.getItem("thisChoice") !== null) {
        thisChoice = JSON.parse(localStorage.getItem("thisChoice"));
        for (let key in thisChoice) {
            totalScore += thisChoice[key];
        }
        if (totalScore < 3) {
            console.log("Bạn chưa chọn đủ đáp án.")
        } else {
            let bau = 0, cua = 0, tom = 0, ca = 0, huou = 0, ga = 0;

            // kiêm tra ảnh 1 ra giá trị gì
            if (firstImg.src.indexOf('bau') !== -1) {
                bau++;
            }
            if (firstImg.src.indexOf('cua') !== -1) {
                cua++;
            }
            if (firstImg.src.indexOf('tom') !== -1) {
                tom++;
            }
            if (firstImg.src.indexOf('ca') !== -1) {
                ca++;
            }
            if (firstImg.src.indexOf('huou') !== -1) {
                huou++;
            }
            if (firstImg.src.indexOf('ga') !== -1) {
                ga++;
            }

            // kiêm tra ảnh 2 ra giá trị gì
            if (secondImg.src.indexOf('bau') !== -1) {
                bau++;
            }
            if (secondImg.src.indexOf('cua') !== -1) {
                cua++;
            }
            if (secondImg.src.indexOf('tom') !== -1) {
                tom++;
            }
            if (secondImg.src.indexOf('ca') !== -1) {
                ca++;
            }
            if (secondImg.src.indexOf('huou') !== -1) {
                huou++;
            }
            if (secondImg.src.indexOf('ga') !== -1) {
                ga++;
            }

            // kiêm tra ảnh 3 ra giá trị gì
            if (thirdImg.src.indexOf('bau') !== -1) {
                bau++;
            }
            if (thirdImg.src.indexOf('cua') !== -1) {
                cua++;
            }
            if (thirdImg.src.indexOf('tom') !== -1) {
                tom++;
            }
            if (thirdImg.src.indexOf('ca') !== -1) {
                ca++;
            }
            if (thirdImg.src.indexOf('huou') !== -1) {
                huou++;
            }
            if (thirdImg.src.indexOf('ga') !== -1) {
                ga++;
            }

            // tạo obj kết quả để so sánh với obj chọn
            if (bau > 0) {
                objResult['bau'] = bau;
            }
            if (cua > 0) {
                objResult['cua'] = cua;
            }
            if (tom > 0) {
                objResult['tom'] = tom;
            }
            if (ca > 0) {
                objResult['ca'] = ca;
            }
            if (huou > 0) {
                objResult['huou'] = huou;
            }
            if (ga > 0) {
                objResult['ga'] = ga;
            }

            if (JSON.stringify(thisChoice) === JSON.stringify(objResult)) {
                console.log(`Bạn đã đoán đúng với kết quả:${changeText(thisChoice)}`);
            } else {
                console.log(`Bạn đã đoán sai với kết quả:${changeText(thisChoice)}`);
            }
        }
    } else {
        console.log("Bạn chưa dự đoán kết quả.")
    }

}
function checkCorrect() {

}
function changeText(thisChoice) {
    let stringResult = ''
    for (let key in thisChoice) {
        if (key == 'bau') {
            stringResult += " Bầu " + thisChoice[key];
        }
        if (key == 'cua') {
            stringResult += " Cua " + thisChoice[key];
        }
        if (key == 'tom') {
            stringResult += " Tôm " + thisChoice[key];
        }
        if (key == 'ca') {
            stringResult += " Cá " + thisChoice[key];
        }
        if (key == 'huou') {
            stringResult += " Hươu " + thisChoice[key];
        }
        if (key == 'ga') {
            stringResult += " Gà " + thisChoice[key];
        }
    }
    return stringResult;

}