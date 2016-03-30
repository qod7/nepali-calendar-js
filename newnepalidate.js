//accepts english date only.
var getCalendarDate = function (currentDate) {
	var tempFormattedGregorianDate = moment(currentDate).format("YYYY-MM-DD");
	var tempGregorianDate;
	var tempNepaliDate;
	var dateList = new Array();

	tempNepaliDate = AD2BS(tempFormattedGregorianDate);
	selectedNepaliDate = tempNepaliDate;
	//console.log("Nepali Date: "+selectedNepaliDate);

	tempNepaliDate =moment(tempNepaliDate).set('date',1).format("YYYY-MM-DD");

	tempGregorianDate = BS2AD(tempNepaliDate);
	//console.log("Temp Gregorian Date: "+tempGregorianDate);

	var currentMonth = moment(tempNepaliDate).get('month');
	var currentYear = moment(tempNepaliDate).get('year');
	//console.log(currentYear, currentMonth);

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

		cond1 = (currentYear === moment(tempNepaliDate).get('year') && currentMonth >= moment(tempNepaliDate).get('month'));

		cond2 =  (currentYear > moment(tempNepaliDate).get('year') && currentMonth === 0);
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

	var dateList = date;
	var count = 0;
 	var enDateArray = new Array();
 	var npDateArray = new Array();
	var npMonthArray = ["Baisakh","Jestha","Ashad","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"];

 	for (var i = 0; i < dateList.length; i++) {

 		var tempNpDate = AD2BS(moment(dateList[i]).format("YYYY-MM-DD"));
		var isSameMonth = moment(moment(dateList[i]).format("YYYY-MM-DD")).isSame(moment(dateList[i]).month(),'month');
 		// console.log("this month:"+isSameMonth);
 		npDateArray.push(moment(tempNpDate).date());
		enDateArray.push(moment(dateList[i]).date());
		// console.log(npDateArray);
	};

	$("#calendar ul li").remove();
	var bool = false;
	for(var i = 0; i <= 4 ; i++) {
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