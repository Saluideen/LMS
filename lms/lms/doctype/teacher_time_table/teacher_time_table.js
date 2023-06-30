// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt
let subject
frappe.ui.form.on('Teacher_Time_Table', {
	refresh: function(frm) {
		// frappe.call({
		// 	 method: "lms.lms.doctype.teacher_time_table.teacher_time_table.get_teacher",
		// 	args:
		// 	{
		// 		'user':frappe.session.user
		// 	},
		// 	callback: function (r) {
				
		// 		subject=r.message[0].subject
		// 	}

		// })


	},
	days:function(frm){
		frm.trigger("time_table")
	},
	teacher:function(frm){
		frm.trigger("time_table")
	},
	
	time_table:function(frm){

	if((frm.doc.days)&&(frm.doc.teacher))
	{

	
		// frappe.throw(frm.doc.days)
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
							subject:el.subject,
							division:el.division,
							from_time:el.from_time,
							to_time:el.to_time

						})
						frm.refresh_field('time_table')
					})
					
						}

				}

				
			});

	}
		}
	
});
