// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('student_current_time_table', {
	refresh: function(frm) {
		frm.doc.time_table.forEach(function(row) {
            
            frm.set_df_property('teacher', 'hidden', true);
			frm.set_df_property('day', 'hidden', true);
        });
		frm.disable_save()
		
		const currentDay = new Date().getDay(); // Returns a number representing the day of the week (0-6)

// Map the day index to the corresponding day name
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayName = daysOfWeek[currentDay];

frm.set_value("day",currentDayName)
frm.refresh_field("day")
frappe.call({
	method: 'lms.lms.doctype.student.student.get_data',
	args: {
		user: frappe.session.user
	},
	callback: function(r) {
	
		
		frm.set_value("standard",r.message[0].standard)
		frm.refresh_field("standard")
		frm.set_value("division",r.message[0].division)
		frm.refresh_field("division")
	}
});
		

	},
	standard:function(frm){
		frm.trigger("time_table")
		frm.trigger("next_hour")
		frm.trigger("topics")
	},
	
	division:function(frm){
		frm.trigger("time_table")
		frm.trigger("next_hour")
		frm.trigger("topics")
		
	},
	// hour:function(frm){
	// 	frm.trigger("topics")
	// },
	// teacher:function(frm){
	// 	frm.trigger("topics")
	// },
	
hour:function(frm){
	
	frm.trigger("mark")
	frm.trigger("topics")
},
teacher:function(frm){
	frm.trigger("topics")
},
subject:function(frm){
	frm.trigger("topics")
},
topics:function(frm){
	if((frm.doc.teacher)&&(frm.doc.standard)&&(frm.doc.division)&&(frm.doc.subject)){

console.log("gfhg",frm.doc.subject);
	frappe.call({
		method: "lms.lms.doctype.topics.topics.get_topics",
	   args:
	   {
		//    'teacher':frm.doc.t_name,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		 'subject':frm.doc.subject,
		   'teacher':frm.doc.teacher
		   
	   },
	   callback: function (r) {
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
	console.log("mark");
	frm.doc.time_table.forEach(function(row) {
        console.log(row.hour)
		
			if(row.hour==frm.doc.hour)
			{
				console.log("hours",row.hour);
				set_css(frm,row.hour);
			}

		
	});
	

},
	
next_hour:function(frm){
	
	if((frm.doc.standard)&&(frm.doc.division)){
		frappe.call({
            method: 'lms.lms.doctype.time_table.time_table.get_next_hour',
            args: {
                days:frm.doc.day,
				standard:frm.doc.standard,
				division:frm.doc.division
            },
            callback: function(r) {
				
				frm.set_value("hour",r.message[0].hour)
				frm.refresh_field("hour")
				frm.set_value("subject",r.message[0].subject)
				frm.refresh_field("subject")
				frm.set_value("teacher",r.message[0].teacher)
				frm.refresh_field("teacher")
				// frm.set_value("t_name",r.message[0].teacher)
				// frm.refresh_field("teacher")
			}
		
		}); 
		
	}
},


time_table:function(frm){
	if((frm.doc.standard)&&(frm.doc.division)){
		frappe.call({
            method: 'lms.lms.doctype.student_current_time_table.student_current_time_table.get_time_table',
            args: {
                days:frm.doc.day,
				standard:frm.doc.standard,
				division:frm.doc.division
            },
            callback: function(r) {
				
				if (r.message.length > 0) {
					r.message.forEach(el => {
						let found = false
						if (frm.doc.time_table) {
							found = frm.doc.time_table.find(function (record) {
								if (record.hour == el.hour )
									return true;
							});
						}
						if (!found) {
						frm.add_child('time_table',{
							hour:el.hour,
							teacher:el.t_name,
							from_time:el.from_time,
							to_time:el.to_time,
							subject:el.subject

						})
						frm.refresh_field('time_table')
					}
					})
					
						}
				
			}
		}); 
}
}
	
});

// var set_css = function (frm,hour) {

//     let el = document.querySelectorAll("[data-fieldname='hour']")[1];
//    console.log("el",el);
//      el.style.backgroundColor ="red";
// 	 let row = el.closest(".grid-row");
// 	 row.style.backgroundColor = "red";

    
// }
// var set_css = function (frm,hour) {
// 	console.log("hfhjg",hour);
// 	let hou=hour
//     let rows = document.querySelectorAll("[data-fieldname='hour']"); // Select all rows in the "hour" column

//     rows.forEach(function(row) {
// 		// console.log("row",row.textContent);
//         if (row.textContent==hour) { // Check if the row value is "4"
// 			console.log("concontent",row.textContent);
//             // let rowElement = row.closest('.grid-row'); // Get the parent grid row element
//             // rowElement.style.backgroundColor = "red"; // Set the background color of the row to red
//         }
//     });
// };
var set_css = function (frm,hour) {
    let rows = document.querySelectorAll("[data-fieldname='hour']"); // Select all rows in the "hour" column

    rows.forEach(function(row) {
        if (row.textContent.trim() === hour.trim()) { // Compare trimmed text content
            let rowElement = row.closest('.grid-row'); // Get the parent grid row element
            rowElement.style.backgroundColor = "red"; // Set the background color of the row to red
        }
    });
};
