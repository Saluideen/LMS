// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Get Teacher Time Table', {
	refresh: function(frm) {
		frm.disable_save()
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
			frm.trigger("time_table")
		   }
		
		})

	},
	time_table:function(frm){
		frappe.call({
			method: "lms.lms.doctype.get_teacher_time_table.get_teacher_time_table.get_time_table",
		   args:
		   {
			   'name':frm.doc.teacher
		   },
		   callback: function (r) {
			if (r.message.length > 0){
			r.message.forEach(el => {
				let found = false
						if (frm.doc.monday_time_table) {
							found = frm.doc.monday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
			
					if(el.day=="Monday"){
						frm.add_child('monday_time_table',{
							hours:el.hour,
							standard:el.Standard,
							division:el.division,
							from_time:el.from_time,
							to_time:el.to_time,
							subject:el.subject
		 
						})
						frm.refresh_field('monday_time_table')
					}

					}

else if(el.day=="Tuesday"){
	let found = false
						if (frm.doc.tuesday_time_table) {
							found = frm.doc.tuesday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
	frm.add_child('tuesday_time_table',{
		hours:el.hour,
		standard:el.Standard,
		division:el.division,
		from_time:el.from_time,
		to_time:el.to_time,
		subject:el.subject

	})
	frm.refresh_field('tuesday_time_table')

}
}
else if(el.day=="Wednesday"){
	let found = false
						if (frm.doc.wednesday_time_table) {
							found = frm.doc.wednesday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
	frm.add_child('wednesday_time_table',{
		hours:el.hour,
		standard:el.Standard,
		division:el.division,
		from_time:el.from_time,
		to_time:el.to_time,
		subject:el.subject

	})
	frm.refresh_field('wednesday_time_table')

}
}
else if(el.day=="Thursday"){
	let found = false
						if (frm.doc.thursday_time_table) {
							found = frm.doc.thursday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
	frm.add_child('thursday_time_table',{
		hours:el.hour,
		standard:el.Standard,
		division:el.division,
		from_time:el.from_time,
		to_time:el.to_time,
		subject:el.subject

	})
	frm.refresh_field('thursday_time_table')

}
}
else if(el.day=="friday"){
	let found = false
						if (frm.doc.friday_time_table) {
							found = frm.doc.friday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
	frm.add_child('friday_time_table',{
		hours:el.hour,
		standard:el.Standard,
		division:el.division,
		from_time:el.from_time,
		to_time:el.to_time,
		subject:el.subject

	})
	frm.refresh_field('friday_time_table')

}
}
else if(el.day=="Saturday"){
	let found = false
						if (frm.doc.saturday_time_table) {
							found = frm.doc.saturday_time_table.find(function (record) {
								if (record.hours == el.hour  )
									return true;
							});
						}
						if (!found) {
	frm.add_child('saturday_time_table',{
		hours:el.hour,
		standard:el.Standard,
		division:el.division,
		from_time:el.from_time,
		to_time:el.to_time,
		subject:el.subject

	})
	frm.refresh_field('saturday_time_table')

}

}			
				
				
			});
		}
			
			
		   }
		
		})
	},
	
});
