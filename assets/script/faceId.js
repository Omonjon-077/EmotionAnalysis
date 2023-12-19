var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
var img = document.getElementById("client");
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var mode = true;
var urlData = '{% static "" %}server/data/fps.csv';

video.width = 400;
video.height = 300;

// Scale the graph canvas accordingly to the window size
var widthupdate = window.innerWidth*0.6;
var heightupdate = window.innerHeight*0.5;

function Mode(){
    if (mode == true){
        mode = false;
        var ws = new WebSocket(
            ws_scheme + '://' + window.location.host + '/'
        );
        ws.onopen = (event) => {
            console.log('websocket connected!!!');
        };
        ws.onmessage = (event) => {
            //console.log("WebSocket message received: ", event.data);
            frameUpdate = event.data;
            img.src = "data:image/jpeg;base64," + frameUpdate;

        };
        ws.onclose = (event) => {
            console.log('Close');
        };
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                    var width = video.width;
                    var height = video.height;
                    var delay = 100; // adjust the delay to fit your needs (ms)
                    var jpegQuality = 0.7; // adjust the quality to fit your needs (0.0 -> 1.0)

                    setInterval(function() {
                        context.drawImage(video, 0, 0, width, height);
                        canvas.toBlob(function(blob) {
                            if (ws.readyState == WebSocket.OPEN) {
                                if (mode == true){
                                    ws.send(new Uint8Array([]));
                                } else {
                                    ws.send(blob);
                                }
                            }
                        }, 'image/jpeg', jpegQuality);
                    }, delay);

                    setTimeout(function(){

                        var chart = c3.generate({
                            bindto: '#chart0',
                            size: {
                                height: heightupdate,
                                width: widthupdate },
                            data: {
                                url: urlData,
                                type: 'line'
                            },
                            axis: {
                                y: {
                                    max: 30,
                                    min: -0.2,
                                }
                            },
                            subchart: {
                                show: false
                            },
                            zoom: {
                                enabled: true
                            }});

                        createchart = setInterval(function() {
                            chart.load({
                                url: urlData,
                                type: 'line'
                            });
                        }, 2000);
                    },500);
                });}
    }
    else if (mode == false){
        mode = true;
        video.pause();
        video.srcObject.getVideoTracks()[0].stop();
        video.srcObject = null;
        setTimeout(function() {
            clearInterval(createchart);
        },500);
    }
};