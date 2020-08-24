const canvas = document.querySelector('.visualizer');
const canvasCtx = canvas.getContext("2d");
let audioCtx;
const smoothingHeight = 5;

const handleSuccess = function(stream) {
  visualize(stream);
};

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(handleSuccess);
} else {
  alert('Media devices not supported on your browser!');
}

function visualize(stream) {
  if (!audioCtx) {
    var AudioContext = window.AudioContext ||
      window.webkitAudioContext;
    audioCtx = new AudioContext();
  }

  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Float32Array(bufferLength);
  source.connect(analyser);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getFloatFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] + 140) * smoothingHeight;

      canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
      canvasCtx.fillRect(x, HEIGHT - barHeight / smoothingHeight, barWidth, barHeight / smoothingHeight);

      x += barWidth + 1;
    }
  };

  draw();
}