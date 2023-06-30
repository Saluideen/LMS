# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class GetTeacherTimeTable(Document):
	pass
		

@frappe.whitelist()
def get_time_table(name):
	
	time_table = frappe.db.sql("""
        SELECT tt.day,tt.standard AS Standard,ts.hour,ts.from_time,ts.to_time,tt.division,ts.subject FROM `tabTime Table` tt
        INNER JOIN `tabTime Tables` ts ON tt.name = ts.parent
        WHERE ts.teacher = %(teacher)s order by ts.from_time
    """, values={'teacher':name},as_dict=1)
	return time_table