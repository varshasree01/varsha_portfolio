
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let dots=[];
for(let i=0;i<120;i++){
 dots.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,dx:Math.random()-0.5,dy:Math.random()-0.5});
}
function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#5bc0ff";
 dots.forEach(d=>{
  d.x+=d.dx; d.y+=d.dy;
  if(d.x<0||d.x>canvas.width)d.dx*=-1;
  if(d.y<0||d.y>canvas.height)d.dy*=-1;
  ctx.beginPath();ctx.arc(d.x,d.y,2,0,Math.PI*2);ctx.fill();
 });
 requestAnimationFrame(animate);
}
animate();

function toggleTheme(){
  document.body.classList.toggle("light-theme");
}

function runCatTheme(){
  const cat = document.getElementById("cat-runner");
  cat.classList.remove("run-cat");
  void cat.offsetWidth; // reset animation
  cat.classList.add("run-cat");
  toggleTheme();
}

let cat = null;
let idleTimer = null;
let isLight = false;

window.onload = () => {
  cat = document.getElementById("pet-cat");
  idleSleep();
};

function idleSleep(){
  clearTimeout(idleTimer);
  cat.className = "cat idle";
  idleTimer = setTimeout(()=>{},2000);
}

document.addEventListener("mousemove",(e)=>{
  clearTimeout(idleTimer);
  cat.className = "cat look";
  cat.style.left = e.clientX + "px";
  idleTimer = setTimeout(idleSleep,2000);
});

function toggleTheme(){
  document.body.classList.toggle("light-theme");
  isLight = !isLight;
  runCat();
}

function runCat(){
  cat.className = "cat run";
  cat.style.transform = isLight ? "scaleX(1)" : "scaleX(-1)";
  setTimeout(()=>cat.className="cat jump",700);
  setTimeout(idleSleep,1800);
}

/* === Cat Behavior Tuned === */
const stepSound = new Audio("cat-step.mp3");
stepSound.volume = 0.4;

function idleSleep(){
  clearTimeout(idleTimer);
  cat.className = "cat idle";
  idleTimer = setTimeout(()=>{},3500); // longer sleep delay
}

function runCat(){
  stepSound.currentTime = 0;
  stepSound.play();
  cat.className = "cat run";
  cat.style.transform = isLight ? "scaleX(1)" : "scaleX(-1)";
  setTimeout(()=>cat.className="cat jump",500);
  setTimeout(()=>{
    stepSound.pause();
    idleSleep();
  },1500);
}
