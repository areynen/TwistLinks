// ==UserScript==
// @name         TwistLinks
// @version      0.1
// @description  Creates a list of DL links
// @author       Alex Reynen
// @match        https://twist.moe/a/*
// ==/UserScript==

(function button_adder() {
    let button = document.createElement('BUTTON');
    button.onclick = function(){
        runner();
    };
    button.textContent = 'Generate Download Links';
    let video_data = document.querySelector('.video-data');
    video_data.appendChild(button);
})();

function runner () {
    document.querySelector('.video-data > button:nth-child(4)').remove();
    video = document.querySelector('.AT-player > video:nth-child(1)');
    source = decodeURI(video.src.replace('https://twist.moe', 'https://edge-6.cdn.bunny.sh'));
    regex = / - (\d\d) /;
    number = regex.exec(source)[1];

    div = document.createElement('div');

    for (let i = 1; i <= 12; i++) {
        let new_link = source.replace(` - ${number} `, ` - ${("0" + i).slice(-2)} `) + '\n';
        let text = document.createTextNode(new_link);
        let par = document.createElement('p');
        par.appendChild(text);
        div.appendChild(par)
    }

    let video_data = document.querySelector('.video-data');
    video_data.appendChild(div);
}