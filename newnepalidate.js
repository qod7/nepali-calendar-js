var setCalendar = function (currentDate) {
	var tempFormattedGregorianDate = currentDate.format("YYYY-MM-DD");
	var tempGregorianDate;
	var tempNepaliDate;
	
	console.log(tempFormattedGregorianDate);

	tempNepaliDate = AD2BS(tempFormattedGregorianDate);
	selectedNepaliDate = tempNepaliDate;
	console.log(selectedNepaliDate);
	
	console.log(tempGregorianDate);

}