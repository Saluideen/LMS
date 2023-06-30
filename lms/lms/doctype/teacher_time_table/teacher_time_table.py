# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime
from frappe.share import add as add_share
from datetime import datetime

class Teacher_Time_Table(Document):
	def on_update(self):
       
		user_mail=frappe.get_list("Teacher",filters={
			'name':self.teacher
		},fields=['email'])
		mail=user_mail[0]['email']
		add_share(self.doctype, self.name, user=mail, read=1, write=1, submit=0, share=1, everyone=0, notify=0)


@frappe.whitelist()
def get_teacher(user):
	data=frappe.db.sql("""select name from `tabTeacher` where user=%(user)s """,
	values={'user':user},as_dict=1)
	return data
	
@frappe.whitelist()
def get_time_table(days,teacher):
    time_table = frappe.db.sql("""
        SELECT tt.standard AS Standard,ts.hour,ts.from_time,ts.to_time,tt.division,ts.subject FROM `tabTime Table` tt
        INNER JOIN `tabTime Tables` ts ON tt.name = ts.parent
        WHERE tt.day = %(days)s AND ts.teacher = %(teacher)s order by ts.from_time
    """, values={'days': days, 'teacher':teacher},as_dict=1)

    return time_table

@frappe.whitelist()
def get_next_hour(days,teacher):
    print("next hour",days,teacher)
    current_time = now_datetime()
    formatted_time = current_time.strftime('%H:%M:%S')
    print(formatted_time)
    time_table = frappe.db.sql("""
        SELECT tt.standard,ts.hour,ts.from_time,ts.to_time,tt.division,ts.subject FROM `tabTime Table` tt
        INNER JOIN `tabTime Tables` ts ON tt.name = ts.parent
        WHERE tt.day = %(days)s AND ts.teacher = %(teacher)s and ts.from_time > %(current_time)s order by ts.hour limit 1
    """, values={'days': days, 'teacher': teacher,"current_time":formatted_time},as_dict=1)

    return time_table
    

