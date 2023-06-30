// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Student Performance"] = {
	"filters": [
		
		{
			"fieldname": "standard",
			"label": __("Standard"),
			"fieldtype": "Link",
			"options": "Standred",
			"reqd": 1,
			



		},
		{
			"fieldname": "division",
			"label": __("Division"),
			"fieldtype": "Link",
			"options": "Division",
			"reqd": 1,
			



		},
		{
			"fieldname": "name",
			"label": __("Student Name"),
			// "fieldtype":"Data",
			"fieldtype": "Link",
			"options": "Student",
			"reqd": 1,
			
			"get_query": function () {
				return {
					query: "lms.lms.report.student_performance.student_performance.get_student",
				};
			}
			



		},
		{
			"fieldname": "from_date",
			"label": __("From"),
			"fieldtype": "Date",
			"reqd": 1,
			default: new Date(new Date().getFullYear(), new Date().getMonth(), 1),

		},
		{
			"fieldname": "to_date",
			"label": __("To"),
			"fieldtype": "Date",
			"reqd": 1,
			default: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),

		},

	]
};
