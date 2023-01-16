// function that extract frames from an html video element with an mp4 source and returns an array of base64 images
// it works by using the new webAudioCodec API that is not yet supported by all browsers
// the function seek to the positions of the positions array and extract the frame at that position

export default async function extractFrames(videoElement: HTMLVideoElement, positions: number[]) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const frames: string[] = [];

	const newVideoElement = document.createElement("video");
	newVideoElement.srcObject = videoElement.srcObject;
	newVideoElement.muted = true;

	positions.forEach((pos) => {
		newVideoElement.currentTime = pos;
		canvas.width = newVideoElement.videoWidth;
		canvas.height = newVideoElement.videoHeight;
		ctx.drawImage(newVideoElement, 0, 0);
		const dataURL = canvas.toDataURL("image/jpeg");
		frames.push(dataURL);
	});
	return frames;
}
