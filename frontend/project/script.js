let video;
let poseNet;
let poses = [];
let counter = 0;
let stage = "down";

function setupCamera() {
    video = document.getElementById('video');
    video.width = 640;
    video.height = 480;

    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        video.srcObject = stream;
    });
}

async function setupPoseNet() {
    poseNet = await posenet.load();
    detectPose();
}

async function detectPose() {
    const pose = await poseNet.estimateSinglePose(video, {
        flipHorizontal: false
    });
    poses = [pose];
    calculateReps();
    requestAnimationFrame(detectPose);
}

function calculateReps() {
    if (poses.length > 0) {
        const keypoints = poses[0].keypoints;
        const leftShoulder = keypoints[5];
        const leftElbow = keypoints[6];
        const leftWrist = keypoints[7];

        if (leftShoulder.score > 0.5 && leftElbow.score > 0.5 && leftWrist.score > 0.5) {
            const angle = calculateAngle(leftShoulder.position, leftElbow.position, leftWrist.position);

            if (angle > 160) {
                stage = "down";
            }
            if (angle < 30 && stage === "down") {
                stage = "up";
                counter++;
                document.getElementById('reps').innerText = counter;
            }
        }
    }
    document.getElementById('stage').innerText = stage;
}

function calculateAngle(a, b, c) {
    const angle = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    return Math.abs(angle * 180 / Math.PI);
}

setupCamera();
setupPoseNet();