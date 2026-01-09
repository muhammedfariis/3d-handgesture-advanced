export class HandDetector {
  constructor(videoId = "video") {
    this.video = document.getElementById(videoId);
    if (!this.video) throw new Error(`Video element with id="${videoId}" not found`);

    this.hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8
    });
  }

  async init(onResults) {
    this.hands.onResults((results) => {
      if (results.multiHandLandmarks?.length) onResults(results.multiHandLandmarks[0]);
    });

    const camera = new window.Camera(this.video, {
      onFrame: async () => await this.hands.send({ image: this.video }),
      width: 640,
      height: 480
    });

    await camera.start()
      .then(() => console.log("Camera started!"))
      .catch(err => console.error("Camera failed:", err));
  }
}
