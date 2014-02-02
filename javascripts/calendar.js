function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

function request_call(td, i, next_date){
	var request = new XMLHttpRequest()
	var url = '/journals/2014'.concat(pad((next_date.getMonth() + 1), 2), pad(next_date.getDate(), 2), '.html')
	request.open('head', url) 
	request.onload = function() {
		if (this.status == 200 || this.status == 304){
			td.innerHTML = "<a href='" + url + "'>" + i + "</a>"
		} else {
			td.innerHTML = i
		}
	}
	request.send()
}

function build_calendar(month, year){
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
	var today = new Date()
	var first_day = new Date(year, month - 1, 1)
	var new_element = document.createElement('div')
	var month_name_header = document.createElement('h4')
	new_element.appendChild(month_name_header)
	var month_table = document.createElement('table')
	new_element.appendChild(month_table)
	month_name_header.innerHTML = monthNames[first_day.getMonth()] 
	var i = 1
	var day = 0
	var first_row = document.createElement('tr')
	while(day < first_day.getDay()){
		var td = document.createElement('td')
		td.innerHTML = ""
		td.className = "blank_day"
		first_row.appendChild(td)
		day += 1
	}
	month_table.appendChild(first_row)
	var blank_day = new Date(first_day.getFullYear(), first_day.getMonth(), 0)
	var next_row = first_row
	while(i <= blank_day.getDate()){
		var next_date = new Date(first_day.getFullYear(), first_day.getMonth(), i)
		if(today.getMonth() == next_date.getMonth() && next_date.getDate() > today.getDate()){
			break;
		}
		var td = document.createElement('td')
		request_call(td, i, next_date)
		if (next_date.getDay() == 0){
			next_row = document.createElement('tr')
			month_table.appendChild(next_row)
		}
		if (next_date.getDate() == today.getDate() && next_date.getMonth() == next_date.getMonth()){
			//td.className = "month_day today"
			td.className = "month_day"
		} else {
			td.className = "month_day"
		}
		next_row.appendChild(td)
		month_table
		i += 1
	}
	return new_element;
}

var tr = document.getElementById('month_td')
var new_element = build_calendar(2, 2014)
tr.appendChild(new_element)
new_element = build_calendar(1, 2014)
tr.appendChild(new_element)
