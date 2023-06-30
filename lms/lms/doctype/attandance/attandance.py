# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Attandance(Document):
	def validate(self):
		existing_attendance = frappe.db.exists({'doctype': 'Attandance','date':self.date,'hour': self.hours,'standard': self.standard,'division': self.division})
		if existing_attendance:
			frappe.throw("Attendance already marked for the same date, hour, standard, and division.")

	
@frappe.whitelist()
def get_student(date,hours,standard, division):
    existing_attendance = frappe.db.exists({
    'doctype': 'Attandance',
    'date': date,
    'hours': hours,
    'standard': standard,
    'division': division
    })
    print(existing_attendance)

    if existing_attendance:
        # attendance_doc = frappe.get_doc('Attandance', existing_attendance)
        # print(" attendance_doc ", attendance_doc )
        # doc_name = attendance_doc.name
        # print("doc_nAME", doc_name)
        doc=frappe.get_all('Attandance_table',
        filters={
            'parent':existing_attendance
        },
        fields=['name1','status'])
        
    else:
        # Attendance document doesn't exist
        doc = frappe.get_all('Student',
            filters={
                'standard': standard,
                'division': division
            },
            fields=['name1']
        )
    return doc
