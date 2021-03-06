prediction = "";

Webcam.set({
    width :350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    });
}
console.log("ml5 version: " , ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GIczG7-Tk/model.json" , modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.SpeechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emoji1");
        prediction = results[0].label;
        speak();
        if(result[0].label == 'Best'){
            document.getElementById("result_emoji1").innerHTML = "&#128077;"; 
        }
        if(result[0].label == 'Victory'){
            document.getElementById("result_emoji1").innerHTML = "&#9996;";
        }
        if(result[0].label == 'Amazing'){
            document.getElementById("result_emoji1").innerHTML = "&#128076;";
        }
    }
}