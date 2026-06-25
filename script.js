const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let multiplier = 1;
let running = false;
let crashed = false;
let cashed = false;
let crashPoint = 0;
let timer;

let balance = 10000;

let points = [
    {x:0,y:250}
];



function drawChart(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // خط نمودار
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#00ff88";

    points.forEach((p,i)=>{

        if(i===0)
            ctx.moveTo(p.x,p.y);
        else
            ctx.lineTo(p.x,p.y);

    });

    ctx.stroke();


    // نقطه آخر
    let last = points[points.length-1];

    ctx.beginPath();
    ctx.arc(last.x,last.y,6,0,Math.PI*2);
    ctx.fillStyle="#00ff88";
    ctx.fill();

}



function startGame(){

    if(running) return;


    running=true;
    crashed=false;
    cashed=false;

    multiplier=1;

    points=[
        {x:0,y:250}
    ];


    // عدد سقوط تصادفی
    crashPoint =
    (Math.random()*8)+1.5;


    document.getElementById("status").innerHTML="در حال حرکت";


    timer=setInterval(()=>{


        if(multiplier >= crashPoint){

            crash();

            return;

        }


        multiplier += 0.03;


        document.getElementById("multi").innerHTML=
        multiplier.toFixed(2);



        let x = points.length*5;

        let y = 250 - Math.log(multiplier)*80;


        points.push({
            x:x,
            y:y
        });



        drawChart();


        if(cashed){

            document.getElementById("profit").innerHTML=
            ((multiplier-1)*100).toFixed(0);

        }


    },100);

}



function cashOut(){

    if(!running || crashed) return;


    cashed=true;


    document.getElementById("status").innerHTML=
    "خروج موفق";


    let profit=
    ((multiplier-1)*100).toFixed(0);


    addHistory(
        "سود +"+profit+" امتیاز"
    );

}



function crash(){

    clearInterval(timer);

    crashed=true;
    running=false;


    document.getElementById("status").innerHTML=
    "سقوط!";


    document.getElementById("multi").innerHTML=
    multiplier.toFixed(2);


    if(!cashed){

        addHistory(
        "باخت در ×"+multiplier.toFixed(2)
        );

    }


}



function addHistory(text){

    let div=document.createElement("div");

    div.innerHTML=text;

    document.getElementById("history")
    .prepend(div);

}