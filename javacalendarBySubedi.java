    public void setCalendar(LocalDate currentDate) {
        LocalDate tempGregorianDate = currentDate;
        NepaliDate tempNepaliDate;

        DateList.clear();

        try {
            tempNepaliDate = NepaliCalendar.convertGregorianToNepaliDate(currentDate.toDate());
            SelectedNepaliDate = tempNepaliDate;

            tempNepaliDate = new NepaliDate(tempNepaliDate.getYear(), tempNepaliDate.getMonthNumber(), 1);

            tempGregorianDate = new LocalDate(NepaliCalendar.convertNepaliToGregorianDate(tempNepaliDate));

            int currentMonth = tempNepaliDate.getMonthNumber(),
                    currentYear = tempNepaliDate.getYear();

            tempGregorianDate = tempGregorianDate.minusDays(tempGregorianDate.getDayOfWeek());
            tempNepaliDate = NepaliCalendar.convertGregorianToNepaliDate(tempGregorianDate.toDate());

            while ((currentYear == tempNepaliDate.getYear() && currentMonth >= tempNepaliDate.getMonthNumber()) ||
                    (currentYear > tempNepaliDate.getYear() && currentMonth == 1)) {
                DateList.add(tempGregorianDate);

                tempGregorianDate = tempGregorianDate.plusDays(1);
                tempNepaliDate = NepaliCalendar.convertGregorianToNepaliDate(tempGregorianDate.toDate());

            }

            if (tempGregorianDate.getDayOfWeek() != 0)
                for (int i = tempGregorianDate.getDayOfWeek(); i <= 6; i++) {
                    DateList.add(tempGregorianDate);

                    tempGregorianDate = tempGregorianDate.plusDays(1);
                }

        } catch (NepaliDateException e) {
            e.printStackTrace();
        }
    }
