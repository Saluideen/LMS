# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime
import datetime

class TimeTable(Document):

	def validate(self):
		if self.time_table:
			for time_table in self.time_table:
				existing_timetable = frappe.db.get_all('Time Tables',filters={
                        'parent': ('!=', self.name),
                        'hour': time_table.hour,
                        # 'subject': time_table.subject,
                        'day':time_table.day,
                        'teacher':time_table.teacher
                        
                    },
                    fields=['parent', 'name'],
                    limit=1)
				if existing_timetable:
					frappe.throw("Subject already scheduled at the same hour on the same day in another class.")
    
  


    

@frappe.whitelist()
def get_next_hour(days,standard,division):
    current_time = datetime.datetime.now()
    formatted_time = current_time.strftime('%H:%M:%S')
    print("ghfh",formatted_time) 
    print("days",days)

    time_table = frappe.db.sql("""
        SELECT ts.teacher,ts.t_name,tt.standard AS Standard,ts.hour,ts.from_time,ts.to_time,tt.division,ts.subject FROM `tabTime Table` tt
        INNER JOIN `tabTime Tables` ts ON tt.name = ts.parent
        WHERE tt.day = %(days)s AND tt.standard = %(standard)s AND tt.division=%(division)s 
        and ts.from_time > %(current_time)s order by ts.hour limit 1
    """, values={'days': days,'standard':standard,'division':division,'current_time':formatted_time},as_dict=1)
    print("time_table",time_table)
    for t in time_table:
        print(t.from_time,t.to_time,t.hour)
           


    return time_table
                
@frappe.whitelist()
def get_teacher(doctype, txt, searchfield, start, page_len, filters):
	return frappe.db.sql("""SELECT t.name,t.name1
	FROM `tabTeacher` t inner join `tabsubject_child` s ON s.parent=t.name
	WHERE s.subject= %(subject)s
	
	 """.format(**{
				'key': searchfield
			}), {
			'txt': "%{}%".format(txt),
			'_txt': txt.replace("%", ""),
			'start': start,
			'page_len': page_len,
			'subject':filters["subject"]

		})
    

		

