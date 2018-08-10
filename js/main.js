  
  //Start Functions
  window.onbeforeunload = function()
  {
   SaveToCache();
  }
  var InProgress;
  var startTime ;
  function Load(){
	LoadFromCache();
	Apply();
	UptateTimes()
  }
  var elements;
  var dateElements;
  var dateTimes = [];
  
  var minutes = 60000;
  var hours = minutes * 60;
  var days = hours * 24;
  var weeks = days * 7;
  //Cache Functions
  function SaveToCache(){
  var empty = 0;
    elements = document.querySelectorAll('input[type=text]');
	for(var i=0; i < elements.length; i++) 
	{
		if(localStorage.getItem(elements[i].name) != elements[i].value){
		localStorage.setItem(elements[i].name,elements[i].value);
		}
		if(elements[i].value =="") empty++;
	}
	if(empty == elements.length) localStorage.clear();
  }
  var defaultValues = [50,118,13,34,10,23,17,38,15,61]
  function LoadFromCache(){
  
    elements = document.querySelectorAll('input[type=text]');
	if(localStorage.length > 0){
		var sbool = localStorage.getItem("InProgress");
		if(sbool === "true"){InProgress = true;}
		else{InProgress = false;}
		startTime = localStorage.getItem("startTime");
		ResumeSession();
		
		
		for(var i=0; i < elements.length; i++) 
		{
			elements[i].value = localStorage.getItem(elements[i].name);
		}
		dateElements = document.getElementsByClassName("date");
		for(var i=0; i < dateElements.length; i++) 
		{
			dateTimes[i] = localStorage.getItem(i+"d");	
		}
		}
		else{
		for(var i=0; i < elements.length; i++) 
		{
			elements[i].value = defaultValues[i];
		}
	}
  }
  
  //Functional Functions
  var names  = ["tBar","sBar","rBar","aBar","mBar"]
  function Apply(){
	elements = document.querySelectorAll('input[type=text]');
	
	var energy;
	for(var i=0; i<names.length; i++) 
	{
		energy = (elements[i*2].value/elements[(i*2)+1].value) *100;
		document.getElementById(names[i]).style.width = energy.toString()+'%';
	}
	SaveToCache();
  }
  
  function Now(a){
	dateElements = document.getElementsByClassName("date");
	dateTimes[a] = Date.now();
	localStorage.setItem(a+"d",dateTimes[a]);
	UptateTimes();
  }
  function Refresh()
  {
	location.reload();
  }
  
  function Clear()
  {
    localStorage.clear();
    elements = document.querySelectorAll('input[type=text]');
	for(var i=0; i<elements.length; i++) 
	{
		elements[i].value = "";
	}
  }
  var s_s = 0;
  var s_m = 0;
  var s_h = 0;
  
  var timer;
  var bool = true;
  function ResumeSession(){
   
  if(InProgress === true){
  console.log(InProgress +" after");
	var button = document.getElementById("timerButton");
	timer = document.getElementById("sessionTimer");
	button.value = "Stop"
	UpdateSessionTimer();
	}
	
  }
  function ToggleSession(){
  
	if(InProgress === true) {InProgress = false;}else{InProgress = true;}
	localStorage.setItem("InProgress",InProgress === true);
	
	var button = document.getElementById("timerButton");
	timer = document.getElementById("sessionTimer");
	if(InProgress === true){ 
		s_s = 0;
		s_m = 0;
		s_h = 0;
		startTime = Date.now();
		button.value = "Stop"
		UpdateSessionTimer();
	}
	else{ 
		button.value = "Start"
	}
	localStorage.setItem("startTime",startTime);
  }
  function UpdateSessionTimer(){
  if(InProgress === true){
	var now = Date.now();
	var dif  = now - startTime;
	s_h = Math.floor(dif / hours);
	s_m = Math.floor((dif-(hours * Math.floor(dif / hours)))  / minutes);
	s_s = Math.floor((dif-(minutes * Math.floor(dif / minutes)))  / 1000);
	timer.textContent = s_h+":"+s_m+":"+s_s;
	setTimeout('UpdateSessionTimer()',1000);
  }
  }
  function UptateTimes(){
	var now = Date.now();
	var dif  = 0;
	var m = 0;
	var h = 0;
	var d =0;
	var w =0;
	for(var i=0; i<dateTimes.length; i++) 
	{
		dif = now - dateTimes[i];
		w = Math.floor(dif / weeks);
		d = Math.floor((dif - (weeks * w)) / days);
		h = Math.floor((dif - (days * Math.floor(dif / days))) / hours);
		m = Math.floor((dif-(hours * Math.floor(dif / hours)))  / minutes);
		dateElements[i].textContent = m+"/"+ h+"/"+ d+ "/"+ w; 
	}
	setTimeout('UptateTimes()',60000);
  }
  
  //Animation Functions
  var pos = 10;
  var size =10;
  var time = 0;
  var difmult = 0;
  var velocity = 0;
  var str ="";
  
  window.onfocus = function() {
    MoveBackground();
  };

  function MoveBackground() {
	if(document.hasFocus()){
		return;
		time += .02;
		difmult = Math.sin(time*.2);
		velocity = Math.sin(time) * Math.sin(time);
		velocity += .4;
		size =50+ difmult*10;
		pos += velocity*2*difmult;
		str = (pos.toString()+'%')+" "+(pos.toString()+'%');
		document.body.style.backgroundPosition  = str;
		str = size.toString()+'%';
		document.body.style.backgroundSize  = str;
		setTimeout('MoveBackground()',16);
	}
}