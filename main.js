video="";
status="";
objects=[];
function preload() {
    video=createVideo("video.mp4");
   
}
function setup() {
canvas=createCanvas(480,300);
canvas.center();
video.hide();
}
function draw() {
    image(video,0,0,480,300);
    if(status!=""){
        objectDetector.detect(video,gotResult);
    
        for(i=0;i<objects.length;i++) {
            document.getElementById(status).innerHTML="Status : Objects Detected";
            document.getElementById("number_objects").innerHTML="Number of Objects : "+objects.length;
            
            percent=floor(objects[i].confidence*100);
            fill("#FF0000");
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}
function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status  : Detecting Objects";
}
function modelLoaded() {
    console.log("Model has Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results) {
if(error) {
    console.error(error);
}else{
    console.log(results);
    objects=results;
}
}