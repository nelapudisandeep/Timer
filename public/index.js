// running an actual clock
let popupBox = document.querySelector('.popup');

popupBox.style.display = "none";
// grabbing the elements
let actualHours = document.querySelector('.actual-hours');
let actualMinutes = document.querySelector('.actual-minutes');
let actualSeconds = document.querySelector('.actual-seconds');
let actualMeridian = document.querySelector('.actual-meridian');
let day = document.querySelector('.actual-day');
day.textContent = new Date().toDateString();
// calculating the time using date in javascript
setInterval(SetClock, 1000);


// running a timer
// opeing the timer overlay
let setBtn = document.querySelector('.set');
let resetBtn = document.querySelector('.reset');

let overlayContainer = document.querySelector('.setTimerContainer');
setBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	overlayContainer.style.display = "flex";
	hidePopUpDialog();
});

// closing the timer overlay
let closeBtn = document.querySelector('.submit');

let setHoursValue;
let setMinutesValue;
let setSecondsValue;

// defining the set values
let hours = document.querySelector('.hours');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

let setIntvl;

closeBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	
	setBtn.style.display = "none";
	resetBtn.style.display = "flex";

	setHoursValue = getSelectedOnes('hours');
	setMinutesValue = getSelectedOnes('minutes');
	setSecondsValue = getSelectedOnes('seconds');
let timeleft = setHoursValue*60*60*1000 + setMinutesValue*60*1000 + setSecondsValue*1000;
    let data = convertMS(timeleft);
    setIntvl = setInterval(()=>{
    	timeleft = timeleft-1000;
    	data = convertMS(timeleft);
    	let hoursLeft = data.hour;
    	let minutesLeft = data.minute;
    	let secondsLeft = data.seconds;

    	if(hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0){
    		showPopUpDialog();
    		resetBtn.style.display = "none";
    		//pop up function
    		clearInterval(setIntvl);
    		hoursLeft = 0;
    		minutesLeft = 0;
    		secondsLeft = 0;
    		setBtn.style.display = "flex";
    	}
    	if(hoursLeft < 10){
    		hoursLeft = "0" + hoursLeft;
    	}

    	if(minutesLeft < 10){
    		minutesLeft = "0" + minutesLeft;
    	}

    	if(secondsLeft < 10){
    		secondsLeft = "0" + secondsLeft;
    	}
    	hours.textContent = hoursLeft;
    	minutes.textContent = minutesLeft;
    	seconds.textContent = secondsLeft;

    },1000);


	overlayContainer.style.display = 'none';
});

 
resetBtn.addEventListener('click',e=>{
	e.preventDefault();
	popupBox.style.display = 'none';
	hours.textContent = "00";
	minutes.textContent = "00";
	seconds.textContent = "00";
	clearInterval(setIntvl);
	setBtn.style.display = 'flex';
	resetBtn.style.display = "none";
});



// reseting the timer


// functions
function SetClock(){
	let actualDate = new Date();
	let hrs = actualDate.getHours();
	let mins = actualDate.getMinutes();
	let secs = actualDate.getSeconds();
	let hrsTemp,minsTemp,secsTemp;
	

	if(hrs<10){
		 hrsTemp = "0"+hrs;
	}else{
		hrsTemp = hrs%12;
	}

	if(mins<10){
		 minsTemp = "0"+mins;
	}else{
		minsTemp = mins%60;
	}

	if(secs<10){
		 secsTemp = "0"+secs;
	}else{
		secsTemp = secs%60;
	}

	actualHours.textContent = hrsTemp;
	actualMinutes.textContent = minsTemp;
	actualSeconds.textContent = secsTemp;

	if(hrs > 12){
		actualMeridian.textContent = "PM";
	}else if(hrs == 12 && mins>0){
		actualMeridian.textContent = "PM";
	}else{
		actualMeridian.textContent = "AM";
	}
}

// function to get the values of a given select box;

function getSelectedOnes(id){
	let e = document.getElementById(id);
	let value = e.options[e.selectedIndex].text;
	return value;
}


function convertMS( milliseconds ) {
    let day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;

    return {
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

function hidePopUpDialog(){
	popupBox.style.display = 'none';
}

function showPopUpDialog(){
	popupBox.style.display = 'flex';
}



