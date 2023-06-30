# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class StudentTimeTable(Document):
	pass
@frappe.whitelist()
def get_time_table(standard,division):
	time_table = frappe.db.sql("""
        SELECT tt.day,ts.hour,ts.from_time,ts.to_time,ts.subject,ts.t_name FROM `tabTime Table` tt
        INNER JOIN `tabTime Tables` ts ON tt.name = ts.parent
        WHERE  tt.standard = %(standard)s AND tt.division=%(division)s order by ts.from_time
    """, values={'standard':standard,'division':division},as_dict=1)
	return time_table