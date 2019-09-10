// ==UserScript==
// @name        TwistLinks
// @version     0.2
// @description Creates a list of DL links
// @author      Alex Reynen
// @match       https://twist.moe/a/*
// @homepage    https://github.com/areynen/TwistLinks
// ==/UserScript==

(function button_adder() {
    let button = document.createElement('BUTTON');
    button.onclick = function () {
        try {
            runner();
        } catch (TypeError) {
            button.textContent = 'Generate Download Links | Please wait for video to load';
        }
    };
    button.textContent = 'Generate Download Links';
    let video_data = document.querySelector('.video-data');
    video_data.appendChild(button);
})();

function runner() {
    let video = document.querySelector('.AT-player > video:nth-child(1)');
    let source = decodeURI(video.src.replace('https://twist.moe', 'https://edge-6.cdn.bunny.sh'));
    let regex = / - (\d\d) /;
    let number = regex.exec(source)[1];

    let div = document.createElement('div');

    for (let i = 1; i <= 12; i++) {
        let new_link = source.replace(` - ${number} `, ` - ${("0" + i).slice(-2)} `) + '\n';
        let text = document.createTextNode(new_link);
        let par = document.createElement('p');
        par.appendChild(text);
        div.appendChild(par)
    }

    let video_data = document.querySelector('.video-data');
    video_data.appendChild(div);
    document.querySelector('.video-data > button:nth-child(4)').remove();
}