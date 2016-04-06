$('.arrow-next').on('click', function() {
    $(this).data('clicked', true);
});

$('.arrow-prev').on('click', function() {
    $(this).data('clicked', true);
});

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

var setCalendar = function(date, todayDate) {

	var dateList = date,
		count = 0,
		setMonth,
 		npDateArray = new Array(),
 		enDateArray = new Array();
 	
 	today = moment(todayDate).date();
 	var dateFlag; //flag to check if it is today or not.
 	dateFlag = false;

 	for (var i = 0; i < dateList.length; i++) {

 		var tempNpDate = AD2BS(dateList[i]);

 		npDateArray.push(getCurrentDay(tempNpDate));
		enDateArray.push(moment(dateList[i]).date());
		// console.log(npDateArray);
	};
	setMonth = moment(dateList[i]).month();
	$("#calendar ul.days li").remove();
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

	  	//check if the date is today and set the flag accordingly
	  	if(enDateArray[count] === today && !(($('.arrow-next').data('clicked'))) && !(($('.arrow-prev').data('clicked'))))
	  		dateFlag = true;
	  	else dateFlag = false;
	    
	    li = $("<li>").appendTo(ul).addClass("day");

	  	if(!bool)
	    	li = li.addClass("other-month");
	    if(dateFlag)
	    	li = li.addClass("today-date");

	    $("<div>").prepend(npDateArray[count]).appendTo(li).addClass("date");
	    $("<div>").prepend(enDateArray[count]).appendTo(li).addClass("endate");

	    count = count + 1;
	  };

};
}

var setDateTitle = function(date) {
	var adDate = date;
    var npMonthArray = new Array("\u092c\u0948\u0936\u093e\u0916", "\u091c\u0947\u0920", "\u0905\u0937\u093e\u0922", "\u0936\u094d\u0930\u093e\u0935\u0923", "\u092d\u093e\u0926\u094d\u0930", "\u0906\u0936\u094d\u0935\u093f\u0928", "\u0915\u093e\u0930\u094d\u0924\u093f\u0915", "\u092e\u0919\u094d\u0938\u093f\u0930", "\u092a\u094c\u0937", "\u092e\u093e\u0918", "\u092b\u093e\u0932\u094d\u0917\u0941\u0928", "\u091a\u0948\u0924\u094d\u0930");
    var enMonthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	
	//change the current date to BS and then retrieve the month from that date.
	npDate = AD2BS(date);
	npMonth = getCurrentMonth(npDate);
	npYear = getCurrentYear(npDate);

	enMonth = moment(adDate).month();
	enYear = moment(adDate).year();

	// if(enMonth >10)
	// 	enMonth = 0;
	var	  plusOne = enMonth + 1
	if (plusOne > 11) plusOne = 0
	$(".month-year-name").html(npMonthArray[npMonth]+" "+npYear+" / "+enMonthArray[enMonth]+"-"+enMonthArray[plusOne]+" "+enYear);
}

$(".arrow-next").click(function() {
	tempEngDate = moment(standardDate).format("YYYY-MM-DD");

	tempNepDate = AD2BS(tempEngDate);

	tempNepDate = addToMonth(tempNepDate,1);
	standardDate = BS2AD(tempNepDate);

 	var dateList = getCalendarDate(standardDate);
 	console.log(dateList.length);
 	setDateTitle(standardDate);
	setCalendar(dateList, standardDate);
});

$(".arrow-prev").click(function() {
	tempEngDate = moment(standardDate).format("YYYY-MM-DD");

	tempNepDate = AD2BS(tempEngDate);
	tempNepDate = addToMonth(tempNepDate,-1);
	standardDate = BS2AD(tempNepDate);
 	var dateList = getCalendarDate(standardDate);

 	setDateTitle(standardDate);
	setCalendar(dateList);
});
