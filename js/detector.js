export class HandDetector {
  constructor() {
    this.hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
  }

  async init(onResults) {
    const video = document.getElementById('webcam');
    this.hands.onResults(onResults);

    const camera = new window.Camera(video, {
      onFrame: async () => {
        await this.hands.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    await camera.start();
  }
}
