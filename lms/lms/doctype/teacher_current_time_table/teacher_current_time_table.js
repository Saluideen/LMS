// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Teacher Current Time Table', {
	refresh: function(frm) {
		frm.disable_save()
		
		const currentDay = new Date().getDay(); // Returns a number representing the day of the week (0-6)

// Map the day index to the corresponding day name
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayName = daysOfWeek[currentDay];

frm.set_value("days",currentDayName)
frm.refresh_field("days")

frappe.call({
	method: "lms.lms.doctype.teacher_time_table.teacher_time_table.get_teacher",
   args:
   {
	   'user':frappe.session.user
   },
   callback: function (r) {
	console.log(r);
	console.log(r.message[0].name);
	   frm.set_value("teacher",r.message[0].name)
	//    subject=r.message[0].subject
   }

})


},
days:function(frm){
	frm.trigger("time_table")
	// frm.trigger("next_hour")
	
},
teacher:function(frm){
	frm.trigger("time_table")
	frm.trigger("topics")
	
	

},
subject:function(frm){
	frm.trigger("topics")
},
standard:function(frm){
	frm.trigger("topics")
},
division:function(frm){
	frm.trigger("topics")
},
hours:function(frm){
	
	frm.trigger("mark")
},
topics:function(frm){
	if((frm.doc.teacher)&&(frm.doc.standard)&&(frm.doc.division)&&(frm.doc.subject)){

	
	frappe.call({
		method: "lms.lms.doctype.topics.topics.get_topics",
	   args:
	   {
		   'teacher':frm.doc.t_name,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		'subject':frm.doc.subject,
		   'teacher':frm.doc.teacher
		   
	   },
	   callback: function (r) {
		if (r.message.length > 0)
		if (r.message.length > 0)
		{

			r.message.forEach(el=> {
				// coming_topic.push(el.topics)
				// frm.set_value("coming",coming_topic)
				let found = false
			if (frm.doc.topics) {
				found = frm.doc.topics.find(function (record) {
					if (record.topic == el.topic )
						return true;
				});
			}
			if (!found) {
			frm.add_child('topics',{
				topic:el.topic,
				
			})
			frm.refresh_field('topics')
		}
	
	
				
			});

		}
	
		
	   }
	
	})
}

},

mark:function(frm){
	frm.doc.time_table.forEach(function(row) {
        console.log(row.hours)
		
			if(row.hours==frm.doc.hours)
			{
				set_css(frm,row.hours);
			}

		
	});
	

},
time_table:function(frm){

if((frm.doc.days)&&(frm.doc.teacher))
{




frappe.call({
   method: "lms.lms.doctype.teacher_time_table.teacher_time_table.get_time_table",
   args:
   {
	   'days': frm.doc.days,
	   'teacher':frm.doc.teacher
	   
   },
   callback: function (r) {
	console.log(r);
	   
	   if (r.message.length > 0) {
		   r.message.forEach(el => {
			   
			   frm.add_child('time_table',{
				   hours:el.hour,
				   standard:el.Standard,
				   division:el.division,
				   from_time:el.from_time,
				   to_time:el.to_time,
				   subject:el.subject

			   })
			   frm.refresh_field('time_table')
		   })
		 
		   frm.trigger("next_hour")
			   }
			  

	   }

	   
   });

}
},
next_hour:function(frm){
	console.log("next_hour");
	
	if((frm.doc.days)&&(frm.doc.teacher)){
		frappe.call({
            method: 'lms.lms.doctype.teacher_time_table.teacher_time_table.get_next_hour',
            args: {
                days:frm.doc.days,
				teacher:frm.doc.teacher
            },
            callback: function(r) {
				
				frm.set_value("hours",r.message[0].hour)
				frm.refresh_field("hours")
				frm.set_value("standard",r.message[0].standard)
				frm.refresh_field("standard")
				frm.set_value("division",r.message[0].division)
				frm.refresh_field("division")
				frm.set_value("subject",r.message[0].subject)
				frm.refresh_field("subject")
			}
		}); 
		
	}
},
});


var set_css = function (frm,hour) {
    let rows = document.querySelectorAll("[data-fieldname='hours']"); // Select all rows in the "hour" column

    rows.forEach(function(row) {
        if (row.textContent.trim() === hour.trim()) { // Compare trimmed text content
            let rowElement = row.closest('.grid-row'); // Get the parent grid row element
            rowElement.style.backgroundColor = "red"; // Set the background color of the row to red
        }
    });
};