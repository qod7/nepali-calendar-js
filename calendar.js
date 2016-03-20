
var CALENDAR = function() {
    var wrap, 
        label, 
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

    function init(newWrap) {
        wrap = $(newWrap || "#cal");
        label = wrap.find("#label");
        wrap.find("#prev").bind("click.calendar", function() {
            switchMonth(false); });
        wrap.find("#next").bind("click.calendar", function(){
            switchMonth(true); });
        label.bind("click", function() {
            switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });
    }

    function switchMonth(next, month, year) { 
        
        var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 
        
        if (!month) { 
            if (next) { 
                if (curr[0] === "December") { 
                    month = 0; 
                } else { 
                    month = months.indexOf(curr[0]) + 1; 
                } 
            } else { 
                if (curr[0] === "January") { 
                    month = 11; 
                } else { 
                    month = months.indexOf(curr[0]) - 1; 
                } 
            } 
        }
        
        if (!year) { 
            if (next  month === 0) { 
                year = tempYear + 1; 
            } else if (!next  month === 11) { 
                year = tempYear - 1; 
            } else { 
                year = tempYear; 
            } 
        }
        calendar = createCal(year, month);
        $("#cal-frame", wrap).find(".curr").removeClass("curr").addClass("temp").end().prepend(calendar.calendar()).find(".temp").fadeout("slow", function(){$(this).remove();});
        $('#label').text(calendar.label);

        calendar =  createCal(year, month); 
        $("#cal-frame", wrap) 
            .find(".curr") 
                .removeClass("curr") 
                .addClass("temp") 
            .end() 
            .prepend(calendar.calendar()) 
            .find(".temp") 
                .fadeOut("slow", function () { $(this).remove(); }); 
        
        $('#label').text(calendar.label);
    }

    function createCal(year, month) {

        var day = 1, i, j, haveDays = true,  
                startDay = new Date(year, month, day).getDay(), 
                daysInMonths = [31, (((year%4==0)&amp;&amp;(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
                calendar = [];
        if (createCal.cache[year]) { 
            if (createCal.cache[year][month]) { 
                return createCal.cache[year][month]; 
            } 
        } else { 
            createCal.cache[year] = {}; 
        }

        i = 0; 
        while (haveDays) { 
            calendar[i] = []; 
            for (j = 0; j &lt; 7; j++) { 
                if (i === 0) { 
                    if (j === startDay) { 
                        calendar[i][j] = day++; 
                        startDay++; 
                    } 
                } else if (day &lt;= daysInMonths[month]) { 
                    calendar[i][j] = day++; 
                } else { 
                    calendar[i][j] = ""; 
                    haveDays = false; 
                } 
                if (day &gt; daysInMonths[month]) { 
                    haveDays = false; 
                } 
            } 
            i++; 
        }

        if (calendar[5]) { 
            for (i = 0; i &lt; calendar[5].length; i++) { 
                if (calendar[5][i] !== "") { 
                    calendar[4][i] = "&lt;span&gt;" + calendar[4][i] + "&lt;/span&gt;&lt;span&gt;" + calendar[5][i] + "&lt;/span&gt;"; 
                } 
            } 
            calendar = calendar.slice(0, 5); 
        }

        for (i = 0; i &lt; calendar.length; i++) { 
            calendar[i] = "&lt;tr&gt;&lt;td&gt;" + calendar[i].join("&lt;/td&gt;&lt;td&gt;") + "&lt;/td&gt;&lt;/tr&gt;"; 
        } 
        calendar = $("&lt;table&gt;" + calendar.join("") + "&lt;/table&gt;").addClass("curr"); 
        
        $("td:empty", calendar).addClass("nil"); 
        if (month === new Date().getMonth()) { 
            $('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
        } 
        createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year }; 
        
        return createCal.cache[year][month];
    }

    createCal.cache = {};
    return {
        init : init,
        switchMonth : switchMonth,
        createCal : createCal
    };
};