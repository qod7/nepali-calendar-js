var setCalendar = function (currentDate) {
	var tempFormattedGregorianDate = currentDate.format("YYYY-MM-DD");
	var tempGregorianDate;
	var tempNepaliDate;
	var dateList = new Array();

	tempNepaliDate = AD2BS(tempFormattedGregorianDate);
	selectedNepaliDate = tempNepaliDate;
	console.log("Nepali Date: "+selectedNepaliDate);

	tempNepaliDate =moment(tempNepaliDate).set('date',1).format("YYYY-MM-DD");

	tempGregorianDate = BS2AD(tempNepaliDate);
	console.log("Temp Gregorian Date: "+tempGregorianDate);

	var currentMonth = moment(tempNepaliDate).get('month');
	var currentYear = moment(tempNepaliDate).get('year');
	console.log(currentYear, currentMonth);

	weekday = moment(tempGregorianDate).weekday();
	diff = moment(tempGregorianDate).subtract(weekday,'days');
	console.log("diff: "+ moment(diff).format("YYYY-MM-DD"));

	tempGregorianDate = moment(diff).format("YYYY-MM-DD");

	// tempGregorianDate = moment(moment(tempGregorianDate   ).diff(weekday).format("YYYY-MM-DD");
	console.log((tempGregorianDate));

	tempNepaliDate = AD2BS(tempGregorianDate);

	cond1 = true;
	cond2 = true;
	var i = 0;
	while ((cond1 || cond2) && i++ <=35) {

		// tempGregorianDate = BS2AD(moment(tempNepaliDate).format("YYYY-MM-DD"));
		 console.log(tempGregorianDate);
		dateList.push(tempGregorianDate);
		//console.log(dateList);

		tempGregorianDate = moment(moment(tempGregorianDate).add(1, 'days')).format("YYYY-MM-DD");
		tempNepaliDate = AD2BS(tempGregorianDate);

		cond1 = (currentYear === moment(tempNepaliDate).get('year') && currentMonth >= moment(tempNepaliDate).get('month'));

		cond2 =  (currentYear > moment(tempNepaliDate).get('year') && currentMonth === 0);
	}
	weekday = moment(tempGregorianDate).weekday();
	// tempGregorianDate = BS2AD(moment(tempNepaliDate).format("YYYY-MM-DD"));

	if(weekday != 0) {
		for(var i = weekday; i <= 6; i++) {
			console.log(tempGregorianDate);
			dateList.push(tempGregorianDate);
			//console.log(dateList);

			tempGregorianDate = moment(moment(tempGregorianDate).add(1, 'days')).format("YYYY-MM-DD");
		}
	}


}