// 전역 변수
let faceType = 1;
let faceX = 200;
let faceY = 150;
let faceScale = 0.5;

// 눈 변수
let snow1;
let snow2;
let snow1Y = 0;
let snow2Y = 0;

function preload(){
  snow1 = loadImage("snow1.png");
  snow2 = loadImage("snow2.png");
}

function setup() {
  createCanvas(400, 600);

  getParam();
}

function draw() {
  background("green");
  
  // mouseX, mouseY
  noStroke();
  fill(235);
  ellipse(200,450,250,250);
  fill(245);
  ellipse(200,300,200,200);
  face(faceX,faceY,faceType);
  
  snow();
  
}

function snow(){
  // 모듈러 %
  // 1 / 10 ... 1
  // 2 / 10 ... 2
  // 9 / 1 ... 9
  // 10 / 10 ...0
  // 11 / 10 ... 1
  // 모듈러를 활용한 루핑 애니메이션
  snow1Y = (snow1Y + 0.5) % height;
  // 기존 루핑 방법
  // if(snow1Y > height){
  //   snow1Y = 0;
  // }
  // 캔버스 높이 만큼 이미지 한 장 더 붙여줌
  image(snow1,0,snow1Y-height,400,600);
  image(snow1,0,snow1Y,400,600);
  
  // 큰 애들이 더 빠르게 떨어지면 공간감이 난다
  snow2Y = (snow2Y + 1) % height;
  image(snow2,0,snow2Y-height,400,600);
  image(snow2,0,snow2Y,400,600);
}

function mouseClicked(){
  let d = dist(faceX,faceY,mouseX,mouseY);
  
  if(d < 150*faceScale){
    faceType += 1;
    if(faceType > 3){
      faceType = 1;
    }

    setParam();
  }
}

function setParam(){
  let url = new URL(location.href); // 주소 가져오기
  url.searchParams.set("faceType", faceType); // 주소에 값 넣기
  history.pushState({},null,url); // 주소창에 반영하기
}

function getParam(){
  let url = new URL(location.href);
  faceType = url.searchParams.get("faceType");
  if(faceType == null){
    faceType = 3;
  }
}

function face(x,y,type){
  let d = dist(x,y,mouseX,mouseY);
  
push();
  translate(x,y);
  scale(faceScale);
  noStroke();
  
  // 조건문 - 소괄호의 조건에 따라 중괄호가 실행된다
  // 소괄호의 조건이 참이면 실행된다
  // 참 true
  // 거짓 false
  if(d < 150*faceScale){
    fill("pink");
  }else{
    fill("white");
  }
  
  ellipse(0,0,300,300);

  // 눈
  push();
    fill("brown");
    ellipse(60,0,40,40);
    fill("navy");
    ellipse(-60,0,40,40);

    fill("rgb(195,91,91)");
    ellipse(60,0,30,30);
    fill("rgb(69,69,192)");
    ellipse(-60,0,30,30);

    // stroke("black")
    // strokeWeight(5);
    // line(55,0,65,0);
  pop();

  // type 1
  fill("orange");
  if(type == 1){
    // 코
    rectMode(CENTER);
    rect(0,60,20,60); 
    // 입
    ellipse(0,90,80,20);
    rect(0,60,20,60);
  }
  
  // type 2
  if(type == 2){ 
    // 코
    ellipse(0,60,50,20);    
    // 입
    stroke("red");
    noFill();
    arc(0,0,200,200,radians(60),radians(120));
  }
  
  // type 3
  if(type == 3){
    // 코
    push();
      translate(0,40);
      fill("orange");
      triangle(
        100,0,
        0,-20,
        0,20);
    pop();
    // 입
    push();
      translate(0,100);
      fill("black");
      ellipse(0,0,20,20);
      ellipse(-50,-10,20,20);
      ellipse(50,-10,20,20);
    pop();
  }
  
pop();
  
  // line(x,y,mouseX,mouseY);
  // text(d,mouseX,mouseY);
}