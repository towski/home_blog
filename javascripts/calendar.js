function pad(num, size) {
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

function request_call(td, i, next_date){
	var request = new XMLHttpRequest()
	var url = '/journals/2014'.concat(pad((next_date.getMonth() + 1), 2), next_date.getDate(), '.html')
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

function build_calendar(){
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
	var today = new Date()
	var month_name_header = document.getElementById('month_name')
	var month_table = document.getElementById('month')
	month_name_header.innerHTML = monthNames[today.getMonth()] 
	var i = 1
	var first_day = new Date(today.getFullYear(), today.getMonth(), 1)
	var day = 0
	var first_row = document.createElement('tr')
	while(day < first_day.getDay()){
		var td = document.createElement('td')
		td.innerHTML = ""
		td.className = "month_day"
		first_row.appendChild(td)
		day += 1
	}
	month_table.appendChild(first_row)
	var blank_day = new Date(today.getFullYear(), today.getMonth(), 0)
	var next_row = first_row
	while(i <= blank_day.getDate()){
		var next_date = new Date(today.getFullYear(), today.getMonth(), i)
		var td = document.createElement('td')
		request_call(td, i, next_date)
		if (next_date.getDay() == 0){
			next_row = document.createElement('tr')
			month_table.appendChild(next_row)
		}
		if (next_date.getDate() == today.getDate()){
			td.className = "month_day today"
		} else {
			td.className = "month_day"
		}
		next_row.appendChild(td)
		month_table
		i += 1
	}
}

build_calendar()
