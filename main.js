img = "";
objects=[];
status="";
var r="";
var g="";
var b="";
var obj="";
var f="";

function start(){
    document.getElementById("status").innerHTML="Getting on it right away...";
    cocossd= ml5.objectDetector('cocossd',modelLoaded );
    obj= document.getElementById("inputObject").value;
    console.log(obj);
}
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
   video= createCapture(VIDEO);
   video.size(380,380);
   video.hide();

}

function preload() {
    

}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    cocossd.detect(video, gotResult);
}

function draw()
{
    image(video, 0, 0, 380,380);
  r= random (255);
  g=random (255);
  b=random (255);

  
for(i=0; i<objects.length; i++){
percent=floor(objects[i].confidence*100);
fill (r,g,b);
document.getElementById("status").innerHTML="Hmmmm...";
text(objects[i].label+" "+percent+ " %", objects[i].x, objects[i].y);
noFill();
stroke (r,g,b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
document.getElementById("list").innerHTML=objects[i].label +" "+percent+"%" +" , ";
console.log(objects[i].label +" "+percent+"%" +" , ");





}


}

function gotResult(error,result){
if(error){
    console.log(error);
}
if(result){
    console.log(result);
    objects=result;
    
    for(i=0; i<objects.length; i++){
        document.getElementById("list").innerHTM+=objects[i];
        if(obj==objects[i].label){
            textToAudio();

        }
       
    }
}

}

function textToAudio() {
    console.log(obj +" has been located!" );
    let msg = obj +" has been located!" ;
    
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
}