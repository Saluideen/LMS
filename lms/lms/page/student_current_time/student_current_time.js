frappe.pages['student_current_time'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Time Table',
		single_column: true
	});
	let day
	const currentDay = new Date().getDay(); // Returns a number representing the day of the week (0-6)

// Map the day index to the corresponding day name
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayName = daysOfWeek[currentDay];
day=currentDayName
	let standard,division
	frappe.call({
		method: 'lms.lms.doctype.student.student.get_data',
		args: {
			user: frappe.session.user
		},
		async:false,
		callback: function(r) {
		
			
			standard=r.message[0].standard
			
			division=r.message[0].division
			
		}
	});
	
	let hours=[]
	let subject=[]
	console.log("days",day)
	frappe.call({
		
		method: 'lms.lms.doctype.student_current_time_table.student_current_time_table.get_time_table',
		args:
		{
			'days':day,
			'standard':standard,
			'division':division
			
		},
		async:false,
		callback: function (r) {
		 
			console.log("dfgg",r);
			if (r.message.length > 0) {
				r.message.forEach(el => {
					hours.push([el.hour, el.subject, el.t_name, el.from_time, el.to_time]);
					
					
					// frm.add_child('time_table',{
					// 	hours:el.hour,
					// 	standard:el.Standard,
					// 	division:el.division,
					// 	from_time:el.from_time,
					// 	to_time:el.to_time,
					// 	subject:el.subject
	 
					// })
					
				})
			  
			
					}
				   
	 
			}
	 
			
		});
		let hour,n_subject
		
		frappe.call({
			method: 'lms.lms.doctype.time_table.time_table.get_next_hour',
            args: {
                days:day,
				standard:standard,
				division:division,
				
            },
			async:false,
            callback: function(r) {
				console.log("next",r);
				hour=r.message[0].hour
				n_subject=r.message[0].subject
				teacher=r.message[0].teacher
				// frm.set_value("hours",r.message[0].hour)
				// frm.refresh_field("hours")
				// frm.set_value("standard",r.message[0].standard)
				// frm.refresh_field("standard")
				// frm.set_value("division",r.message[0].division)
				// frm.refresh_field("division")
				// frm.set_value("subject",r.message[0].subject)
				// frm.refresh_field("subject")
			}
		}); 
		let topics=[]
		if((teacher)&&(standard)&&(division)&&(n_subject)){

		frappe.call({
			method: "lms.lms.doctype.topics.topics.get_topics",
		   args:
		   {
			   'teacher':teacher,
			   'standard':standard,
			   'division':division,
			'subject':n_subject,
			 
			   
		   },
		   async:false,
		   callback: function (r) {
			console.log("topicsjhk",r);
			
			if (r.message.length > 0)
			{
	
				r.message.forEach(el=> {
				topics.push(el.topic)
				
		
		
					
				});
	
			}
		
			
		   }
		
		})
	}
		console.log("topics",topics);
	var tableStructure = [
		// Define the table header row
		['Hour', 'Subject','Teacher', 'From', 'To'],
		// Add more rows for other data
	  ];
	  console.log("tableStructure.length",tableStructure.length);
	  
	  // Loop through the table structure array and generate the HTML code
	  var tableRows = '';
	  var tableRows = '';
for (var i = 0; i < hours.length; i++) {
  var row = hours[i];
  
  var tableCells = '';
  var isHour1Present = false; 
  for (var j = 0; j < row.length; j++) {
    if (row[j] === hour) {
      isHour1Present = true;
    }
 
    tableCells += '<td>' + row[j] + '</td>';
  }
  
  
  var rowStyle = isHour1Present ? 'style="background-color:green;"' : '';
  
  tableRows += '<tr ' + rowStyle + '>' + tableCells + '</tr>';
}

var html = `<div class="time-table-container">
  <table class="table">
    <tr>
      <th>Hour</th>
      <th>Subject</th>
      <th>Teacher</th>
      <th>From</th>
      <th>To</th>
    </tr>
    ${tableRows}
  </table>
</div>
<div class="time-table-container" style="padding:20px">
  <table class="table_topic">
    <tr>
      <th>Topics</th>
      
    </tr>
	<tr>
	<td>
    ${topics}
	</td>
	</tr>
  </table>
</div>`;

$(wrapper).find('.layout-main-section-wrapper').html(html);

	  
	  // Combine the table structure HTML with the rest of the code
	//   var html = `<div class="time-table-container">
	// 	<table class="table">
	// 	  <tr>
			
	// 		<th>Hour</th>
	// 		<th>Subject</th>
	// 		<th>Standard</th>
	// 		<th>Division</th>
	// 		<th>From</th>
	// 		<th>To</th>
	// 	  </tr>
		  
	// 	  ${tableRows}
	// 	</table>
	//   </div>`;
	  

$(wrapper).find('.layout-main-section-wrapper').html(html);

}