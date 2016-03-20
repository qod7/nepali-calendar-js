var setCalendar = function (currentDate) {
	var tempGregorianDate = currentDate;
	var tempNepaliDate;
	console.log(currentDate);
	console.log(currentDate.toLocaleDateString());

		tempNepaliDate = AD2BS(currentDate.toLocaleDateString());
		selectedNepaliDate = tempNepaliDate;
		console.log(selectedNepaliDate);
		
		var a = tempNepaliDate.split('-');
		tempNepaliDate = a[0]+"-"+a[1]+"-"+"1";
		console.log(tempNepaliDate);

		// tempGregorianDate = BS2AD(tempNepaliDate);
		console.log(tempGregorianDate);

		var currentMonth = a[1],
			currentYear = a[0];

		//console.log(tempGregorianDate.getDay());
}