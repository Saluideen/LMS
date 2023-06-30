# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GetAttendance(Document):
	pass
@frappe.whitelist()
def get_attendance(name,standard,division,from_date,to_date):
	attendance=frappe.db.sql("""select a.hours,a.date,at.status from `tabAttandance` a inner join `tabAttandance_table` at
	on a.name=at.parent  where  a.standard=%(standard)s and a.division=%(division)s and at.name1=%(name)s 
	and a.date BETWEEN %(from_date)s and %(to_date)s order by date DESC
	""",values={'standard':standard,'division':division,'name':name,'from_date':from_date,'to_date':to_date},as_dict=1)
	return attendance
