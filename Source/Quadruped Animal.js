"use strict";
/* Veysel Alperen Ceylan
*	21302543
*	09.04.2018
*   I used and get help sample codes of our official textbook. (robotarm, hat etc.)
*	I got help from robotarm and hat for understanding matrix stack and angle.
*	http://www.cs.bilkent.edu.tr/~gudukbay/cs465_lectures/Edward_Angel_Example_Codes.zip
*	I used some source from Internet. One of them is file reader and downloader. https://stackoverflow.com/a/29176118 , https://stackoverflow.com/a/30800715
*/

//variables
var canvas;
var gl;
var bufferId;
var slider_speed, slider_head, slider_body;
var slider_frontL1, slider_frontL2, slider_frontR1, slider_frontR2;
var slider_backL1, slider_backL2, slider_backR1, slider_backR2;
var locx = -3;
var locy = 3;
var cBuffer;
var vPosition;
var vColor;
var modeViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var time = 0;
var polygon = true;
var start = false;
var speed=5;
var selectedkf = 0;
var foxBufferId;

// model that drawed
var fox = 
{ 
	name: "body",
	position: vec2(locx,locy),
	rotation: 0,
	pointList: [
	vec2(0,0),
	vec2(5,0),
	vec2(5,-2),
	vec2(0,-2)],
	childList:[
	{
		name: "frontL1",
		position: vec2(4.9,-2),
		rotation: 0,
		pointList: [
		vec2(0,0),
		vec2(0,-2),
		vec2(-0.5,-2),
		vec2(-1,0)],
		childList:[{
			name: "frontL2",
			position: vec2(-0.5,-2),
			rotation: 0,
			pointList: [
			vec2(0,0),
			vec2(0,-1.5),
			vec2(0.5,-1.5),
			vec2(0.5,0)]
		}]
	},
	{
		name: "frontR1",
		position: vec2(4.9,-2),
		rotation: 0,
		pointList: [
		vec2(0,0),
		vec2(0,-2),
		vec2(-0.5,-2),
		vec2(-1,0)],
		childList:[{
			name: "frontR2",
			position: vec2(-0.5,-2),
			rotation: 0,
			pointList: [
			vec2(0,0),
			vec2(0,-1.5),
			vec2(0.5,-1.5),
			vec2(0.5,0)]
		}]
	},
	{
		name: "backL1",
		position: vec2(1,-2),
		rotation: 0,
		pointList: [
		vec2(0,0),
		vec2(0,-2),
		vec2(-0.5,-2),
		vec2(-1,0)],
		childList:[{
			name: "backL2",
			position: vec2(-0.5,-2),
			rotation: 0,
			pointList: [
			vec2(0,0),
			vec2(0,-1.5),
			vec2(0.5,-1.5),
			vec2(0.5,0)]
		}]
	},
	{
		name: "backR1",
		position: vec2(1,-2),
		rotation: 0,
		pointList: [
		vec2(0,0),
		vec2(0,-2),
		vec2(-0.5,-2),
		vec2(-1,0)],
		childList:[{
			name: "backR2",
			position: vec2(-0.5,-2),
			rotation: 0,
			pointList: [
			vec2(0,0),
			vec2(0,-1.5),
			vec2(0.5,-1.5),
			vec2(0.5,0)]
		}]
	},
	{
		name: "head",
		position: vec2(4.5,0),
		rotation: 0,
		pointList: [
		vec2(0,0),
		vec2(0,1.5),
		vec2(1.5,1.5),
		vec2(1.5,0)],
	},
	{
		name: "tail",
		position: vec2(0.1,-0.1),
		rotation: 20,
		pointList: [
		vec2(0,0),
		vec2(-3,0),
		vec2(-3,-0.5),
		vec2(-2.5,-1)],
	}
	]
};

//default keyframes
var keyframes = [
	{
		body: {rotation: 0},
		frontL1: {rotation: 0},
		frontL2: {rotation: 60},
		frontR1: {rotation: -40},
		frontR2: {rotation: 30},
		backL1: {rotation: 0},
		backL2: {rotation: 60},
		backR1: {rotation: -40},
		backR2: {rotation: 30},
		head: {rotation: 0},
		tail: {rotation: 20}
	},
	{
		body: {rotation:   5},
		frontL1: {rotation: -40},
		frontL2: {rotation:  30},
		frontR1: {rotation: 0 },
		frontR2: {rotation: 60},
		backL1: {rotation: -40},
		backL2: {rotation: 30},
		backR1: {rotation: 0},
		backR2: {rotation: 60},
		head: {rotation: 15},
		tail: {rotation: 50}
	},
];

var currentKeyframe = 0;

//initial function
window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
    {
        alert("WebGL is not available!");
    }
    
    //
    // Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0, 0, 0, 1.0);
	gl.enable(gl.POLYGON_OFFSET_FILL);
	gl.disable(gl.CULL_FACE);
    gl.polygonOffset(1.0, 2.0);
    
    // Load shaders and initialize attribute buffers
    
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    // Load the data into the GPU
	
	foxBufferId = gl.createBuffer();
	//console.log(part)
	gl.bindBuffer( gl.ARRAY_BUFFER, foxBufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 128, gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );   
 
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	
	// sliders
	var children = document.querySelectorAll("#sliders input");
	children.forEach((slider) => {
		slider.onchange = function() {
			keyframes[selectedkf][slider.id].rotation = event.srcElement.value;	  
		};
	});
    slider_speed = document.getElementById("slider_speed");
    slider_speed.onchange = function() {
		speed = event.srcElement.value; 
	};
	setKF(selectedkf);
    render();
}

//render method that drawing
function render()
{
	gl.clearColor(0, 0, 0, 1.0);	
	gl.clear( gl.COLOR_BUFFER_BIT );
	
    var modelViewMatrix = lookAt( vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    var projectionMatrix = ortho( -10, 10, -10, 10, -100, 100 );
    
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    
	var stack = [
		modelViewMatrix
	];
	drawPart(fox, stack);

	//timer for animation it starts and pauses  with start and pause button.
	if(start){
		time += 1.0/60.0;
		if (time/0.5 > currentKeyframe + 1) {
			currentKeyframe++;
		}
	}
	window.requestAnimFrame(render);
}

//draw parts recursively
function drawPart(part, stack){
	var currentkf = keyframes[currentKeyframe%keyframes.length];
	var nextkf = keyframes[(currentKeyframe+1)%keyframes.length];
	var dt = (time % 0.5) / 0.5;

	//var manuel =keyframes;
	
	if (currentkf[part.name] && nextkf[part.name]) {
		//currentkf[part.name].rotation = manuel[currentKeyframe%manuel.length][part.name].rotation;
		//nextkf[part.name].rotation = manuel[(currentKeyframe+1)%manuel.length][part.name].rotation;
		var angle = currentkf[part.name].rotation * (1-dt) + nextkf[part.name].rotation *dt;
		//manuel[part.name].rotation= angle;
		part.rotation = angle;
		
	}
	if(part.name == "body" && start){
		part.position[0] = (part.position[0]+(0.01*speed)-10)%10;
		//console.log("position:" + part.position[0]);
	}
	var mat = mult(stack[stack.length-1], translate(part.position[0], part.position[1],0));
	mat = mult(mat, rotate(part.rotation, 0,0,1));
	stack.push(mat);
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(mat) );
	//gl.bindBuffer( gl.ARRAY_BUFFER, foxBufferId);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(part.pointList));
	for ( var i = 0; i < part.pointList.length; i+=4) { 
		if(polygon)
			gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
		else
			gl.drawArrays( gl.LINE_LOOP, i, 4 );
		
	}

	for (var p in (part.childList || [])) {
		drawPart(part.childList[p], stack);
	}
	stack.pop();
}

//method for set polygon variable by looking at radio buttons
function setRadioButton(){	
	if (document.getElementById('r1').checked) {
		polygon = true;
	}else if(document.getElementById('r2').checked){
		polygon = false;
	}
}

//method for change radio buttons UI
function setRadioButtonR(){	
	if (polygon) {
		console.log("a")
		document.getElementById('r1').checked = "checked";
		//document.getElementById('r2').checked = "unchecked";
	}else{
		console.log("b")
		document.getElementById('r2').checked = "checked";
		//document.getElementById('r1').checked = "unchecked";
	}
}

//method that changes UI of sliders
function setKF(val){
	selectedkf = val;
	for(var key in keyframes[val]){
		document.getElementById(key).value = keyframes[val][key].rotation;
	}
	setRadioButtonR();
}

//method that start action button
function setActionButton(){	
	if (start == false) {
		start = true;
	}else {
		start = false;
	}
}

//method that reset variables to default
function resetButton(){	
	speed=5, polygon = true;
	keyframes = [
		{
			body: {rotation: 0},
			frontL1: {rotation: 0},
			frontL2: {rotation: 60},
			frontR1: {rotation: -40},
			frontR2: {rotation: 30},
			backL1: {rotation: 0},
			backL2: {rotation: 60},
			backR1: {rotation: -40},
			backR2: {rotation: 30},
			head: {rotation: 0},
			tail: {rotation: 20}
		},
		{
			body: {rotation:   5},
			frontL1: {rotation: -40},
			frontL2: {rotation:  30},
			frontR1: {rotation: 0 },
			frontR2: {rotation: 60},
			backL1: {rotation: -40},
			backL2: {rotation: 30},
			backR1: {rotation: 0},
			backR2: {rotation: 60},
			head: {rotation: 15},
			tail: {rotation: 50}
		},
	];
	setKF(selectedkf);
}

//method that save key frames into json file with button used from https://stackoverflow.com/a/30800715
function saveKF(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({speed,polygon,keyframes}));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

//method for open text file and apply. I used JSON parsing. I used this source: https://stackoverflow.com/a/29176118
function openFile(event) {
		var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
			var text = reader.result;
			var obj = JSON.parse(text);
			console.log(obj)
			speed = obj.speed;
			polygon = obj.polygon;
			keyframes=obj.keyframes;
			setKF(selectedkf);
			setRadioButtonR();
			var node = document.getElementById('output');
			node.innerText = text;
          //console.log(reader.result.substring(0, 200));
        };
		reader.readAsText(input.files[0]);
		input.value="";
      };
