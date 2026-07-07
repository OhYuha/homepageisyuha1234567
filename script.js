const audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

let audioContext;
let gainNode;
let source;

// 오디오 초기화 함수 (사용자 상호작용 후 실행되어야 함)
function initAudio() {
    if (audioContext) return; // 이미 생성되었다면 중단

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    source = audioContext.createMediaElementSource(audio);

    // 오디오 소스 -> 증폭 노드 -> 스피커 연결
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

// 재생/일시정지 버튼
playPauseBtn.addEventListener('click', () => {
    initAudio(); // 클릭 시 오디오 컨텍스트 활성화 (브라우저 정책)

    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "Pause";
    } else {
        audio.pause();
        playPauseBtn.innerText = "Play";
    }
});

// 볼륨 슬라이더 조절
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    volumeValue.innerText = value + "%";

    if (gainNode) {
        // 100%가 1.0이므로 500%는 5.0으로 변환
        const gain = value / 100;
        gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
    }
});
