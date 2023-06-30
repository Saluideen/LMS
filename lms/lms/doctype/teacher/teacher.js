// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Teacher', {
	refresh: function(frm) {
		if(!frm.is_new()){
			frm.disable_save()
			frm.disable_form()
		}

	}
});
