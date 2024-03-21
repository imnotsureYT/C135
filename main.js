object = "";
object = [];
started = false;
loaded = false;

function preload()
{

}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw()
{
    if (loaded==true)
    {
        // image(video, 0, 0, 480, 380);
        // video.loop()

        if (started == true)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            video.loop()
            objectDetector.detect(video, gotResults);
            for (i=0;i<object.length;i++)
            {
                var percent = floor(object[i].confidence*100);
                text(object[i].label+" "+percent+"%", object[i].x+15,object[i].y+15);

                stroke(r,g,b);
                fill(r,g,b);
                noFill();
                rect(object[i].x,object[i].y, object[i].width,object[i].height);
            }
            if (document.getElementById('volume').value<=1 && document.getElementById('volume').value>=0)
            {
                volume = document.getElementById('volume').value;
                video.volume(volume);
            }
            else
            {
                video.volume(0)
            }
            if (document.getElementById('speed2').value!=0 && document.getElementById('speed2').value <= 10)
            {
                var speed1 = document.getElementById('speed2').value;
                video.speed(speed1);
            }
            else
            {
                video.speed(1);
            }
        }
        else
        {
            video.stop()
        }
    }
    
}

function modelLoaded()
{
    console.log('cocossd loaded');
    objectDetector.detect(video, gotResults);
    loaded = true;
}

function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        object = results;
    }
}