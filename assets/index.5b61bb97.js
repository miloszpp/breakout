(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();function f(){const e={leftPressed:!1,rightPressed:!1};return document.addEventListener("keydown",i=>{i.key==="Right"||i.key==="ArrowRight"?e.rightPressed=!0:(i.key==="Left"||i.key==="ArrowLeft")&&(e.leftPressed=!0)},!1),document.addEventListener("keyup",i=>{i.key==="Right"||i.key==="ArrowRight"?e.rightPressed=!1:(i.key==="Left"||i.key==="ArrowLeft")&&(e.leftPressed=!1)},!1),e}function u({ctx:e},i,t){e.beginPath(),e.arc(i.x,i.y,i.radius,0,Math.PI*2),e.fillStyle=t.ballColor,e.fill(),e.closePath()}function s({ctx:e},i,t){e.beginPath(),e.rect(i.x,t.canvasHeight-i.height,i.width,i.height),e.fillStyle=t.paddleColor,e.fill(),e.closePath()}function h({ctx:e},i,t){for(let d=0;d<t.brickColumnCount;d++)for(let r=0;r<t.brickRowCount;r++)i.data[d][r].isDestroyed||(e.beginPath(),e.rect(i.data[d][r].x,i.data[d][r].y,t.brickWidth,t.brickHeight),e.fillStyle=t.brickColor,e.fill(),e.closePath())}function n(e,i,t,d){const{ctx:r}=e;r.clearRect(0,0,t.canvasWidth,t.canvasHeight),u(e,i.ball,t),s(e,i.paddle,t),h(e,i.bricks,t),d()&&requestAnimationFrame(()=>n(e,i,t,d))}const a={canvasWidth:800,canvasHeight:600,brickRowCount:6,brickColumnCount:5,brickHeight:20,brickPadding:10,brickOffsetTop:30,brickOffsetLeft:30,brickColor:"#00a878",ballSpeed:3,ballRadius:10,ballColor:"#fe5e41",paddleSpeed:5,paddleColor:"#f3c178",get brickWidth(){return(this.canvasWidth-2*this.brickOffsetLeft)/this.brickColumnCount-this.brickPadding}};function b(e){const i={data:[]};for(let t=0;t<e.brickColumnCount;t++){const d=[];i.data.push(d);for(let r=0;r<e.brickRowCount;r++){const o=t*(e.brickWidth+e.brickPadding)+e.brickOffsetLeft,l=r*(e.brickHeight+e.brickPadding)+e.brickOffsetTop;d.push({x:o,y:l,isDestroyed:!1})}}return{bricks:i,ball:{x:e.canvasWidth*Math.random(),y:e.canvasHeight/3,radius:e.ballRadius,dx:e.ballSpeed,dy:e.ballSpeed},paddle:{x:(e.canvasWidth-e.canvasWidth/7)/2,width:e.canvasWidth/7,height:10,speed:e.paddleSpeed}}}function y(e,i){for(let t=0;t<i.brickColumnCount;t++)for(let d=0;d<i.brickRowCount;d++){const r=e.bricks.data[t][d];if(!r.isDestroyed&&e.ball.x>r.x&&e.ball.x<r.x+i.brickWidth&&e.ball.y>r.y&&e.ball.y<r.y+i.brickHeight)return r}}function k(e,i,t,d){const{ball:r,paddle:o}=e;(r.x+r.dx>t.canvasWidth-r.radius||r.x+r.dx<r.radius)&&(r.dx=-r.dx),r.y+r.dy<r.radius?r.dy=-r.dy:r.y+r.dy>t.canvasHeight-r.radius&&(r.x>o.x&&r.x<o.x+o.width?r.dy=-r.dy:d());const l=y(e,t);l!==void 0&&(r.dy=-r.dy,l.isDestroyed=!0),r.x+=r.dx,r.y+=r.dy,i.rightPressed&&o.x+o.width<=t.canvasWidth?o.x+=o.speed:i.leftPressed&&o.x>=0&&(o.x-=o.speed)}function c(e,i){if(e==null)throw new Error(i!=null?i:"assertDefined failed");return e}const p=()=>c(document.querySelector("#mainCanvas"),"Could not get canvas"),C=e=>c(e.getContext("2d"),"Could not get 2d context");function v(){const e=p(),i=C(e),t={canvas:e,ctx:i},d=f(),r=b(a);let o=!0,l;e.setAttribute("width",String(a.canvasWidth)),e.setAttribute("height",String(a.canvasHeight)),n(t,r,a,()=>o),l=setInterval(()=>k(r,d,a,()=>{o=!1,clearInterval(l),alert("GAME OVER")}),10)}v();