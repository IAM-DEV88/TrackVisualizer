const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lyricDisplaySPA = document.getElementById('lyricDisplaySPA');
const lyricDisplayENG = document.getElementById('lyricDisplayENG');

const audioFile = document.getElementById('archivo');
const letra = document.getElementById('letra');

const cancionInput = document.getElementById('cancionInput');
const autorInput = document.getElementById('autorInput');
const setCancion = document.getElementById('setCancion');
const setAutor = document.getElementById('setAutor');

const lineasSPA = document.getElementById('lineasSPA');
const lineasENG = document.getElementById('lineasENG');

const colorSombraSPA = document.getElementById('colorTextoSombraSPA');
const colorSombraENG = document.getElementById('colorTextoSombraENG');
const colorTextoSPA = document.getElementById('colorTextoSPA');
const colorTextoENG = document.getElementById('colorTextoENG');
const lineaInputSPA = document.getElementById('lineaInputSPA');
const lineaInputENG = document.getElementById('lineaInputENG');
const setLineSPA = document.getElementById('setLineSPA');
const setLineENG = document.getElementById('setLineENG');
const agregarSPA = document.getElementById('agregarSPA');
const agregarENG = document.getElementById('agregarENG');

const retrocederSPA = document.getElementById('retrocederLineaSPA');
const retrocederENG = document.getElementById('retrocederLineaENG');
const lineInInputSPA = document.getElementById('lineInInputSPA');
const lineInInputENG = document.getElementById('lineInInputENG');
const setCurrentInSPA = document.getElementById('setCurrentInSPA');
const setCurrentInENG = document.getElementById('setCurrentInENG');

const pausar = document.getElementsByClassName('pausar');

const setCurrentOutSPA = document.getElementById('setCurrentOutSPA');
const setCurrentOutENG = document.getElementById('setCurrentOutENG');
const lineOutInputSPA = document.getElementById('lineOutInputSPA');
const lineOutInputENG = document.getElementById('lineOutInputENG');
const adelantarSPA = document.getElementById('adelantarLineaSPA');
const adelantarENG = document.getElementById('adelantarLineaENG');

const retrocederLente = document.getElementById('retrocederLente');
const lente = document.getElementById('lenteInput');
const adelantarLente = document.getElementById('adelantarLente');

const colorFondo = document.getElementById('colorFondo');
const rotacion = document.getElementById('rotacion');
const rotacionB = document.getElementById('rotacionB');

const sizeLogo = document.getElementById('sizeLogo');
const posLogoX = document.getElementById('posLogoX');
const posLogoY = document.getElementById('posLogoY');

const letraUpdate = document.getElementById('letraUpdate');

const pista = document.getElementById('pista');

let letraFile="";
let letraTemp = {};
let activo=false;
let currentTrackTime = 0; 

function lyricWalker(Time){
	let fadeIn;
	let fadeOut;
	let phrase;
	if (letraFile!="") {
		letraTemp.spa.forEach(timeIn => {
			fadeIn = parseFloat(timeIn[0]);
			fadeOut = parseFloat(timeIn[1]);
			phrase = timeIn[2];
			if(Time >= fadeIn){
				lyricDisplaySPA.innerHTML = phrase;
			}
			if(Time >= fadeOut){
				lyricDisplaySPA.innerHTML = "";
			}
		});
		letraTemp.eng.forEach(timeIn => {
			fadeIn = parseFloat(timeIn[0]);
			fadeOut = parseFloat(timeIn[1]);
			phrase = timeIn[2];
			if(Time >= fadeIn){
				lyricDisplayENG.innerHTML = phrase;
			}
			if(Time >= fadeOut){
				lyricDisplayENG.innerHTML = "";
			}
		});
	}
}

letraUpdate.addEventListener('click', function(){
	$.ajax({
		type: "POST",
		url: "php/saveJSON.php",
		data: {file:letraFile, lyric:letraTemp},
		success: function(succes){alert(succes);},
		error: function(error){alert(error);}
	})
});

audioFile.addEventListener('change', function(){
	const files = this.files;
	pista.src = URL.createObjectURL(files[0]);
});

letra.addEventListener('change', function(){
	letraFile = "letra/"+this.files[0].name;
	fetch("letra/"+this.files[0].name)
	.then(results => results.json())
	.then(function(results){
		loadLyric(results);
	});
});

function loadLyric(song){
	lineasENG.innerHTML = "";
	lineasSPA.innerHTML = "";

	cancionInput.value = song.name;
	autorInput.value = song.author;

	song.spa.forEach(phrase => {
		lineasSPA.innerHTML += "<option>"+phrase[2]+"</option>";
	});
	song.eng.forEach(phrase => {
		lineasENG.innerHTML += "<option>"+phrase[2]+"</option>";
	});
	letraTemp = song;
}

setCancion.addEventListener('click', function(){
	letraTemp.name = cancionInput.value;
});

setAutor.addEventListener('click', function(){
	letraTemp.author = autorInput.value;
});

function cargarLineaSPA(){
	lineaInputSPA.value = lineasSPA.value;
	lineInInputSPA.value = formatSecondsAsTime(letraTemp.spa[lineasSPA.selectedIndex][0]);
	lineOutInputSPA.value = formatSecondsAsTime(letraTemp.spa[lineasSPA.selectedIndex][1]);
}

lineasSPA.addEventListener('change', function(){
	cargarLineaSPA();
});

lineasSPA.addEventListener('dblclick', function(){
	let foco = letraTemp.spa[lineasSPA.selectedIndex][0];
	pista.currentTime = foco;
	currentTrackTime = pista.currentTime;
});

colorTextoSPA.addEventListener('change', function(){
	lyricDisplaySPA.style.color = this.value;
});

colorSombraSPA.addEventListener('change', function(){
	lyricDisplaySPA.style.textShadow = "0px 0px 20px "+this.value;
	ctx.shadowColor = this.value;
});

setLineSPA.addEventListener('click', function(){
	let newLine = lineaInputSPA.value;
	letraTemp.spa[lineasSPA.selectedIndex][2] = newLine;
	loadLyric(letraTemp);
});

agregarSPA.addEventListener('click', function(){
	let newLine = ["","","Nueva linea"];
	letraTemp.spa.splice(lineasSPA.selectedIndex+1, 0, newLine);
	loadLyric(letraTemp);
});

eliminarSPA.addEventListener('click', function(){
	delete letraTemp.spa[lineasSPA.selectedIndex];
	loadLyric(letraTemp);
});

retrocederSPA.addEventListener('click', function(){
	if(lineasSPA.selectedIndex==0){
	}else{
		lineasSPA.selectedIndex-=1	
		cargarLineaSPA();
	}
});

setCurrentInSPA.addEventListener('click', function(){
	let newTime = formatSecondsAsTime(pista.currentTime);
	lineInInputSPA.value = newTime;
	letraTemp.spa[lineasSPA.selectedIndex][0] = pista.currentTime;
});

Array.from(pausar).forEach(function(element) {
	element.addEventListener('click', function(){
		if (activo) {
			currentTrackTime = pista.currentTime;
			pista.pause();
			activo=false;
		}else{
			pista.currentTime = currentTrackTime;
			pista.play();
			activo=true;
		}
	});
});

setCurrentOutSPA.addEventListener('click', function(){
	let newTime = formatSecondsAsTime(pista.currentTime);
	lineOutInputSPA.value = newTime;
	letraTemp.spa[lineasSPA.selectedIndex][1] = pista.currentTime;
});

adelantarSPA.addEventListener('click', function(){
	if(lineasSPA.selectedIndex<=lineasSPA.length && !lineasSPA.selectedIndex<0){
	}else{
		lineasSPA.selectedIndex+=1;
		cargarLineaSPA();
	}
});



function cargarLineaENG(){
	lineaInputENG.value = lineasENG.value;
	lineInInputENG.value = formatSecondsAsTime(letraTemp.eng[lineasENG.selectedIndex][0]);
	lineOutInputENG.value = formatSecondsAsTime(letraTemp.eng[lineasENG.selectedIndex][1]);
}

lineasENG.addEventListener('change', function(){
	cargarLineaENG();
});

lineasENG.addEventListener('dblclick', function(){
	let foco = letraTemp.eng[lineasENG.selectedIndex][0];
	pista.currentTime = foco;
	currentTrackTime = pista.currentTime;
});

colorTextoENG.addEventListener('change', function(){
	lyricDisplayENG.style.color = this.value;
});

colorSombraENG.addEventListener('change', function(){
	lyricDisplayENG.style.textShadow = "0px 0px 20px "+this.value;
	ctx.shadowColor = this.value;
});

setLineENG.addEventListener('click', function(){
	let newLine = lineaInputENG.value;
	letraTemp.eng[lineasENG.selectedIndex][2] = newLine;
	loadLyric(letraTemp);
});

agregarENG.addEventListener('click', function(){
	let newLine = ["","","Nueva linea"];
	letraTemp.eng.splice(lineasENG.selectedIndex+1, 0, newLine);
	loadLyric(letraTemp);
});

eliminarENG.addEventListener('click', function(){
	delete letraTemp.eng[lineasENG.selectedIndex];
	loadLyric(letraTemp);
});

retrocederENG.addEventListener('click', function(){
	if(lineasENG.selectedIndex==0){
	}else{
		lineasENG.selectedIndex-=1	
		cargarLineaENG();
	}
});

setCurrentInENG.addEventListener('click', function(){
	let newTime = formatSecondsAsTime(pista.currentTime);
	lineInInputENG.value = newTime;
	letraTemp.eng[lineasENG.selectedIndex][0] = pista.currentTime;
});

setCurrentOutENG.addEventListener('click', function(){
	let newTime = formatSecondsAsTime(pista.currentTime);
	lineOutInputENG.value = newTime;
	letraTemp.eng[lineasENG.selectedIndex][1] = pista.currentTime;
});

adelantarENG.addEventListener('click', function(){
	if(lineasENG.selectedIndex<=lineasENG.length && !lineasENG.selectedIndex<0){
	}else{
		lineasENG.selectedIndex+=1;
		cargarLineaENG();
	}
});

pista.addEventListener('playing', function(){
	initVisualizer();
});
pista.addEventListener('pause', function(){
	activo=false;
});
pista.addEventListener('ended', function(){
	activo=false;
});	








// colorFondo.addEventListener('change', function(){
// 	canvas.style.background = this.value;
// });










canvas.width = 852;
// canvas.width = 1280;
canvas.height = 480;
// canvas.height = 720;


const sprite = new Image();
const waves = new Image();
// sprite.src = "img/dftpnk.png";
sprite.src = "img/slpkt.png";
waves.src = "img/redBolt.png";

let audioSource, analyser;

ctx.lineCap = 'round';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 40;
ctx.shadowColor = 'red';


function initVisualizer(){
	activo=true;

	const audioCtx = new window.AudioContext();
	audioSource = audioCtx.createMediaElementSource(pista);
	analyser = audioCtx.createAnalyser();
	audioSource.connect(analyser);
	analyser.connect(audioCtx.destination);
	analyser.fftSize = 256;

	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	const barWidth = (canvas.width/2)/bufferLength;
	// const barWidth = 15;
	let barHeight;
	let x;

	let lastTime = 0;
	const fps = 60;
	const nextFrame = 1000/fps;
	let timer = 0;

	function animar(timeStamp){
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		if (timer > nextFrame) {
			x = 0;
			analyser.getByteFrequencyData(dataArray);
			ctx.clearRect(0,0,canvas.width,canvas.height);
			dibujarOndas(bufferLength, x, barWidth, barHeight, dataArray);
		// 	if (activo) {
		// 		lyricDisplay.style.fontSize = getRandomFloat(36, 37, 4)+"px";
		// 	}else{
		// 		lyricDisplay.style.fontSize = 36+"px";
		// }
		function getRandomFloat(min, max, decimals) {
			const str = (Math.random() * (max - min) + min).toFixed(decimals);
			return parseFloat(str);
		}
	}else{
		timer += deltaTime;
	}
	requestAnimationFrame(animar);
}
animar(0);
}

function dibujarOndas(bufferLength, x, barWidth, barHeight, dataArray){
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * .6;
		const hue = i * .1;
		ctx.fillStyle = 'hsl('+hue+',20%,50%)';
		ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
		x += barWidth;
	}
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * .6;
		const hue = i * .1;
		ctx.fillStyle = 'hsl('+hue+',20%,50%)';
		ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
		x += barWidth;
	}
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] * sizeLogo.value/300;
		ctx.save();
		ctx.translate(posLogoX.value, posLogoY.value);
		// ctx.translate(canvas.width/2, canvas.height/2);
		ctx.rotate(i * rotacion.value);
		// const hue = i * 3.1;
		// ctx.fillStyle = 'hsl('+hue+',20%,50%)';
		// ctx.fillRect(0, 0, barWidth, barHeight);
		ctx.drawImage(waves, 0, barHeight, barHeight/2.5, barHeight/2.5);
		x += barWidth;
		ctx.restore();
	}

	let size = dataArray[15] / 100 * sizeLogo.value;
	ctx.drawImage(sprite, posLogoX.value-size/2, posLogoY.value-size/2, size, size);
	// ctx.drawImage(sprite, canvas.width/2 - size/2, canvas.height/2 - size/2, size, size);
}

function formatoSegundos(tiempo){
	let min = parseFloat(tiempo[0]) * 60;
	let sec = parseFloat(tiempo[1]);
	return min + sec;
}
function formatSecondsAsTime(s) {
	function pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}
	var hr  = Math.floor(s / 3600);
	var min = Math.floor((s - (hr * 3600))/60);
	var sec = Math.floor(s - (hr * 3600) -  (min * 60));
	var ms = s % 1000;
	return pad(min) + ':' + pad(sec) + '.' + pad(ms,6);
}