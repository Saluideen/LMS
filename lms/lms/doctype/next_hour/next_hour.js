// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Next hour', {
	refresh: function(frm) {
	
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
		console.log(r.message[0].standard);
		frm.set_value("standard",r.message[0].standard)
		frm.refresh_field("standard")
		frm.set_value("division",r.message[0].division)
		frm.refresh_field("division")
	}
});
		

	},
	standard:function(frm){
		frm.trigger("next_hour")
		frm.trigger("Comleted_topics")
	},
	division:function(frm){
		frm.trigger("next_hour")
		frm.trigger("Comleted_topics")
	},
	hour:function(frm){
		frm.trigger("topics")
	},
	teacher:function(frm){
		frm.trigger("topics")
		frm.trigger("Comleted_topics")
	},
	subject:function(frm){
		frm.trigger("Comleted_topics")
	},
	Comleted_topics:function(frm){
		if((frm.doc.teacher)&&(frm.doc.subject)&&(frm.doc.standard)&&(frm.doc.division))
		{
			
	frappe.call({
		method: "lms.lms.doctype.topics.topics.completed_topics",
	   args:
	   {
		   'teacher':frm.doc.t_name,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		   'subject':frm.doc.subject
		   
	   },
	   callback: function (r) {
		if (r.message.length > 0)
		{
			r.message.forEach(el=> {
				frm.set_value("completed_topics",el.topics)
	
				
			});
			

		}
		
		
		
	   }
	});

		}

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
				console.log(r);
				frm.set_value("hour",r.message[0].hour)
				frm.refresh_field("hour")
				frm.set_value("subject",r.message[0].subject)
				frm.refresh_field("subject")
				frm.set_value("teacher",r.message[0].t_name)
				frm.refresh_field("teacher")
				frm.set_value("t_name",r.message[0].teacher)
				frm.refresh_field("teacher")
			}
		
		}); 
		
	}
},
topics:function(frm){
	if((frm.doc.hour&&(frm.doc.teacher))){

	
	frappe.call({
		method: "lms.lms.doctype.topics.topics.get_topics",
	   args:
	   {
		   'teacher':frm.doc.t_name,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		   'hour':frm.doc.hour
		   
	   },
	   callback: function (r) {
		if (r.message.length > 0)
		{
			r.message.forEach(el=> {
				frm.set_value("topics",el.topics)
				
			});
			

		}
		
	
		
	   }
	
	})
}

},

});
var set_css = function (frm) {
    let el = document.querySelectorAll("[data-fieldname='subject']")[1];
    el.style.height ="50px";
    el.style.width ="520px";
     el.style.backgroundColor ="red";
   // el.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg')";
    el.style.color="white";
    el.style.padding="20px";
    el.style.textAlign = "center";
    el.style.marginLeft="350px"
    el.borderradius="50px";
    el.style.fontSize="250px"
    // el.style.backgroundSize = "cover";
    // el.style.backgroundPosition = "center";
    
}
