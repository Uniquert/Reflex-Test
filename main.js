song1 = ""
song2 = ""

function preload() {
    song1 = loadSound("spongebob.mp3");
    song2 = loadSound("Mozart.mp3");
}

leftElbowX = 0;
leftElbowY = 0;

rightElbowX = 0;
rightElbowY = 0;

scoreLeftElbow = 0;
scoreRightElbow = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is initialized');
}

function gotPoses(results) {
    if(results.length > 0) 
    {
        console.log(results);
        scoreLeftElbow = results[0].pose.keypoints[7].score;
        scoreRightElbow = results[0].pose.keypoints[8].score;
        console.log("scoreLeftElbow = " + scoreLeftElbow + "scoreRightElbow = " + scoreRightElbow);

        console.log(results); 
        leftElbowX = results[0].pose.leftElbow.x
        leftElbowY = results[0].pose.leftElbow.y
        console.log("Left Elbow X = " + leftElbowX + "Left Elboww Y = " + leftElbowY);

        console.log(results);
        rightElbowX = results[0].pose.rightElbow.x
        rightElbowY = results[0].pose.rightElbow.y
        console.log("Right Elbow X = " + rightElbowX + "Right Elbow Y = " + rightElbowY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_playing = song1.isPlaying();
    song2_playing = song2.isPlaying();

    fill("#40E0D0");
    stroke("#40E0D0");

    if(scoreLeftElbow > 0.2)
    {
        circle(leftElbowX, leftElbowY, 20);

        song2.stop();

        if(song1_playing = true) 
        {
            song1.play();

            document.getElementById("song").innerHTML = "Spongebob Theme is Playing";
        }
    }

    if(scoreRightElbow > 0.2)
    {
        circle(rightElbowX, rightElbowY, 20);
        
        song1.stop();

        if(song2_playing = true)
        {
            song2.play();

            document.getElementById("song").innerHTML = "Mozart Drill is Playing";
        }
    }
}