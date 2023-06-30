// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt
let s_name,standard,division
frappe.ui.form.on('Get Attendance', {
	refresh: function(frm) {
		frm.disable_save()
		frappe.call({
			method: 'lms.lms.doctype.student.student.get_data',
			args: {
				user: frappe.session.user
			},
			callback: function(r) {
				console.log(r);
				console.log(r.message[0].standard);
				standard=r.message[0].standard
				s_name=r.message[0].name1
				division=r.message[0].division
				
			}
		});

	},
	from_date:function(frm){
		frm.trigger("Attendance")
	},
	to_date:function(frm){
		frm.trigger("Attendance")
	},
	Attendance:function(frm){
		if((frm.doc.from_date)&&(frm.doc.to_date)){
			frappe.call({
				method: 'lms.lms.doctype.get_attendance.get_attendance.get_attendance',
				args: {
					name:s_name,
					standard:standard,
					division:division,
					from_date:frm.doc.from_date,
					to_date:frm.doc.to_date
				},
				callback: function(r) {
					if (r.message.length > 0) {
						r.message.forEach(el => {
							let found = false
						if (frm.doc.attendance) {
							found = frm.doc.attendance.find(function (record) {
								if (record.hour == el.hours && record.date==el.date   )
									return true;
							});
						}
						if (!found) {	
							frm.add_child('attendance',{
								hour:el.hours,
								date:el.date,
								status:el.status
	
							})
							frm.refresh_field('attendance')
						}
						})
						
							}
					
					
				}
			});
			
		}

	}
});
