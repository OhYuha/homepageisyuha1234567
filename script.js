const audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

let audioContext;
let gainNode;
let source;

// 오디오 시스템 초기화 (클릭 시 실행)
function initAudio() {
    if (audioContext) return; 

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    source = audioContext.createMediaElementSource(audio);

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

// 재생/일시정지 제어
playPauseBtn.addEventListener('click', () => {
    initAudio(); 

    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "Pause";
    } else {
        audio.pause();
        playPauseBtn.innerText = "Play";
    }
});

// 볼륨 슬라이더 (0% ~ 500%)
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    volumeValue.innerText = value + "%";

    if (gainNode) {
        // 100%를 1로 계산하여 500%일 때 5배 증폭
        const gain = value / 100;
        gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
    }
});
