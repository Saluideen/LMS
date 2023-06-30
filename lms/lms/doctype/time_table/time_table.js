// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Time Table', {
	 refresh: function(frm) {
		frm.fields_dict['time_table'].grid.get_field('teacher').get_query = function (doc, cdt, cdn) {
			let child = locals[cdt][cdn];
			let subject = ''
				subject = child.subject
			
			return {
				query: "lms.lms.doctype.time_table.time_table.get_teacher",
			filters: { 'subject':child.subject}
			};
		}
		}
		
	// 	console.log();
		
	// 	frappe.call({
    //         method: 'lms.lms.doctype.time_table.time_table.get_next_hour',
    //         args: {
    //             days:frm.doc.day,
	// 			standard:frm.doc.standard,
	// 			division:frm.doc.division
    //         },
    //         callback: function(response) {
	// 			console.log(response);
	// 		}
	// 	});      
	
	

});
frappe.ui.form.on("Time Tables","subject",function(frm,cdt,cdn){
	let row=locals[cdt][cdn]
	console.log(frm.doc.day);
	frappe.model.set_value(cdt, cdn, "day", frm.doc.day);
	

})


