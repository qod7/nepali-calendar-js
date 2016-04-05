var setDateToOne = function (date) {
	var tempDate = date.split("-");
	tempDate[2] =''+0+ "1";
	tempDate = tempDate.join("-");
	return tempDate;
}

var addToMonth = function (date, monthsToAdd) {
//accepts nepali date
//adds or subtracts 1 in the given nepali date and returns the new date string

	var tempDate = date.split("-");

	//check if the date is baishakh and previous month is needed and decrease the year value by 1
	if(tempDate[1] == '01' && monthsToAdd < 0 ){
		tempDate[0] = parseInt(tempDate[0]) - 1;
		tempDate[1] = '12';
	}
	//check if the date is chaitra and next month is needed and increase the year value by 1
	else if(tempDate[1] == '12' && monthsToAdd > 0 ){
		tempDate[0] = parseInt(tempDate[0]) + 1;
		tempDate[1] = 01;
	}
	else {
	tempDate[1] = parseInt(tempDate[1]) + monthsToAdd;
	if(tempDate[1] < 10)
		tempDate[1] = ""+ 0 + tempDate[1];
	}

	tempDate = tempDate.join("-");
	return tempDate;
}

var getCurrentMonth = function (date) {
	var tempDate = date.split("-");
	 return parseInt(tempDate[1])-1;
}
var getCurrentYear= function (date) {
	var tempDate = date.split("-");
	 return parseInt(tempDate[0]);
}
var getCurrentDay= function (date) {
	var tempDate = date.split("-");
	 return parseInt(tempDate[2]);
}

var getCalendarDate = function (currentDate) {
//accepts english date only.
	var tempFormattedGregorianDate = currentDate,
		tempGregorianDate,
		tempNepaliDate,
		dateList = new Array();

	tempNepaliDate = AD2BS(tempFormattedGregorianDate);
	selectedNepaliDate = tempNepaliDate;
	tempNepaliDate = setDateToOne(tempNepaliDate);
	tempGregorianDate = BS2AD(tempNepaliDate);

	var currentMonth = getCurrentMonth(tempNepaliDate),
		currentYear = getCurrentYear(tempNepaliDate);

	weekday = moment(tempGregorianDate).weekday();
	diff = moment(tempGregorianDate).subtract(weekday,'days');
	//console.log("diff: "+ moment(diff).format("YYYY-MM-DD"));

	tempGregorianDate = moment(diff).format("YYYY-MM-DD");

	// tempGregorianDate = moment(moment(tempGregorianDate   ).diff(weekday).format("YYYY-MM-DD");
	//console.log((tempGregorianDate));

	tempNepaliDate = AD2BS(tempGregorianDate);

	cond1 = true;
	cond2 = true;
	var i = 0;
	while ((cond1 || cond2) && i++ <=35) {

		// tempGregorianDate = BS2AD(moment(tempNepaliDate).format("YYYY-MM-DD"));
		 //console.log(tempGregorianDate);
		dateList.push(tempGregorianDate);
		////console.log(dateList);

		tempGregorianDate = moment(moment(tempGregorianDate).add(1, 'days')).format("YYYY-MM-DD");
		tempNepaliDate = AD2BS(tempGregorianDate);

		cond1 = (currentYear === getCurrentYear(tempNepaliDate) && currentMonth >= getCurrentMonth(tempNepaliDate));

		cond2 =  (currentYear > getCurrentYear(tempNepaliDate) && currentMonth === 0);
	}
	
	weekday = moment(tempGregorianDate).weekday();
	// tempGregorianDate = BS2AD(moment(tempNepaliDate).format("YYYY-MM-DD"));

	if(weekday != 0) {
		for(var i = weekday; i <= 6; i++) {
			//console.log(tempGregorianDate);
			dateList.push(tempGregorianDate);
			////console.log(dateList);

			tempGregorianDate = moment(moment(tempGregorianDate).add(1, 'days')).format("YYYY-MM-DD");
		}
	}

	return dateList;
}

var setCalendar = function(date) {

	var dateList = date,
		count = 0,
		setMonth,
 		npDateArray = new Array(),
 		enDateArray = new Array();

 	for (var i = 0; i < dateList.length; i++) {

 		var tempNpDate = AD2BS(dateList[i]);

 		npDateArray.push(getCurrentDay(tempNpDate));
		enDateArray.push(moment(dateList[i]).date());
		// console.log(npDateArray);
	};
	setMonth = moment(dateList[i]).month();
	$("#calendar ul li").remove();
	var bool = false;
	var rows;
	if(dateList.length > 35)
		rows = 5;
	else 
		rows = 4;
	for(var i = 0; i <= rows ; i++) {
	  var ul = $("<ul>").appendTo("#calendar").addClass("days");
	  for(var j = 0; j <= 6; j++) {

	  	if(npDateArray[count] === 1)
	  		if(bool)
	  			bool = false;
	  		else
	  			bool = true;

	    	li = $("<li>").appendTo(ul).addClass("day");

	  	if(!bool)
	    	li = li.addClass("other-month");

	      $("<div>").prepend(npDateArray[count]).appendTo(li).addClass("date");
	      $("<div>").prepend(enDateArray[count]).appendTo(li).addClass("endate");

	      count = count + 1;

	  };

};


}

var setDateTitle = function(date) {

	var adDate = date;
	var npMonthArray = ["Baisakh","Jestha","Ashad","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"];
	
	//change the current date to BS and then retrieve the month from that date.
	npDate = AD2BS(date);
	month = getCurrentMonth(npDate);
	year = getCurrentYear(npDate);
	$(".month-year-name").html(npMonthArray[month]+" "+year);
}

$(".arrow-next").click(function() {

	tempEngDate = moment(standardDate).format("YYYY-MM-DD");

	tempNepDate = AD2BS(tempEngDate);

	tempNepDate = addToMonth(tempNepDate,1);
	standardDate = BS2AD(tempNepDate);
 	var dateList = getCalendarDate(standardDate);
 	console.log(dateList.length);
 	setDateTitle(standardDate);
	setCalendar(dateList);
});

$(".arrow-prev").click(function() {

	tempEngDate = moment(standardDate).format("YYYY-MM-DD");
	console.log("cuttent english date: "+tempEngDate);

	tempNepDate = AD2BS(tempEngDate);
	console.log("converted nepal date: "+tempNepDate);
	tempNepDate = addToMonth(tempNepDate,-1);
	console.log("subtracted Nepali Date: " + tempNepDate);
	standardDate = BS2AD(tempNepDate);
	//console.log(standardDate);
	// console.log(standardDate);
 	var dateList = getCalendarDate(standardDate);

 	setDateTitle(standardDate);
	setCalendar(dateList);
});