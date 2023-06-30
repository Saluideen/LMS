// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Attandance', {
	refresh: function(frm) {
		if(!frm.is_new()){
			frm.disable_save()
			frm.set_df_property("date","read_only",1)
			frm.set_df_property("standard","read_only",1)
			frm.set_df_property("division","read_only",1)
			frm.set_df_property("hours","read_only",1)
			frm.set_df_property("attandance","read_only",1)
		}

	},
	standard:function(frm){
		// frm.trigger('get_student')
		frm.trigger("attendance")
	},
	division:function(frm){
		// frm.trigger('get_student')
		frm.trigger("attendance")

	},
	date:function(frm){
		frm.trigger("attendance")

	},
	hours:function(frm){
		frm.trigger("attendance")

	},
	attendance(frm){
		if(frm.doc.date && frm.doc.hours && frm.doc.standard && frm.doc.division){
			frappe.call({
				method: 'lms.lms.doctype.attandance.attandance.get_student',
				args: {
					date:frm.doc.date,
					hours:frm.doc.hours,
					standard:frm.doc.standard,
					division:frm.doc.division
				},
				callback: function(r) {
					console.log(r);
					if (r.message.length > 0) {
						r.message.forEach(el => {
							
							frm.add_child('attandance',{
								name1:el.name1,
								status:el.status
	
							})
							frm.refresh_field('attandance')
							if(el.status)
							{
								frm.disable_save()
								frm.disable_form()
							}
						})
						
							}
					
				}
			});

		}

	},
	get_student(frm){
		if(frm.doc.standard && frm.doc.division){
			frappe.call({
				method: 'lms.lms.doctype.attandance.attandance.get_student',
				args: {
					standard:frm.doc.standard,
					division:frm.doc.division
				},
				callback: function(r) {
					if (r.message.length > 0) {
						r.message.forEach(el => {
							
							frm.add_child('attandance',{
								name1:el.name1
	
							})
							frm.refresh_field('attandance')
						})
						
							}
					
				}
			});
					

		}
	}
});
