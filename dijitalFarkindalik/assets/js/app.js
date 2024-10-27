const soruListesi = [
    new Soru("1-İnternette kişisel bilgilerimizin güvenliğini sağlamak çok önemlidir. Aşağıdakilerden hangisini bir yabancıyla paylaşmamalısın?", { a: "Favori renk", b: "Gittiğin okul", c: "Parola", d: "Evcil hayvanının fotoğrafıv"}, "c"),
    new Soru("2-İnternette bir oyun oynuyorsun ve karşı tarafta oyunu oynadığın kişi seninle konuşmaya başlıyor: 'Hey, bu oyunda gerçekten iyisin. Benimle buluşup bir sonraki seviyeye nasıl geleceğimi bana göstermek ister misin?' Ona ne cevap verirsin?", { a: "HAYIR! der ve durumu birine anlatırım.", b: "Evet, oyunda bölümü nasıl geçeceğimi bana gösterebilirsin.", c: "Emin değilim. Seni tanımıyorum.", d: "Hemen buluşalım, eğlenceli olur." }, "a"),
    new Soru("3-Okuldan bir kişi ödevlerin için yardımcı olacak bir site bağlantısı verdi. Güvenilir bilgi almak için ne yapardın?", { a: "Kullanırım, nasıl olsa güvenilir bir kaynaktır.", b: "Biraz daha fazla bilgi edinmek için kitaba bakarım.", c: "Bilgilerin güvenilir olup olmadığını görmek için en az 3 web sitesini kontrol ederim.", d: "Öğretmenime sorarım." }, "c"),
    new Soru("4-Bilinmeyen bir numaradan arka arkaya tehditkar mesajlar alıyorsun. Mesajlar her iki saatte bir gelmeye devam ediyor. Ne yapmalısın?", { a: "Mesajları silerim.", b: "Telefon numaralarını engellerim", c: "Güvendiğim bir yetişkine anlatırım.", d: "Mesajları geri gönderirim."}, "c")
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function() {
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function() {
    if(quiz.sorular.length != quiz.soruIndex) {
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }
});

function optionSelected(e) {
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedElement = e.target;

    if(selectedElement.nodeName == "SPAN") {
        selectedElement = selectedElement.parentElement;
    }
    const cevap = e.target.textContent[0];
    const soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }

    quiz.soruIndex += 1;
    ui.disableAllOption();
    ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function() {
    window.location.href = "index.html";
});

ui.btnReplay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    // start button
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");
});

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);
            ui.timeText.textContent = "Süre Bitti";

            ui.disableAllOption();
            quiz.soruIndex += 1;

            ui.btnNext.classList.add("show");
        }
    }
}

let counterLine;
function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;

        ui.timeLine.style.width = line_width + "px";

        if(line_width > 549) {
            clearInterval(counterLine);
        }
    }
}
