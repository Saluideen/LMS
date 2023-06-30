# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Topics(Document):
	pass
@frappe.whitelist()
def get_topics(teacher,standard,division,subject):
	# topics=frappe.get_list("Topics",
	# filters={
	# 	'teacher':teacher,
	# 	'standard':standard,
	# 	'division':division,
		
	# 	'status':'New'
	# },fields=['topics'],limit_page_length=1)
	topics=frappe.db.sql(""" select ut.topic from `tabTopics` ts inner join `tabupcoming_topics` ut 
	on ut.parent=ts.name where ts.teacher=%(teacher)s and ts.standard=%(standard)s
	and ts.division=%(division)s and  ts.subject=%(subject)s and ts.status='New' order by ut.creation  limit 1  """,
	values={'teacher':teacher,'standard':standard,'division':division,'subject':subject},as_dict=1)
	return topics

@frappe.whitelist()
def completed_topics(teacher,standard,division,subject):
	c_topics=frappe.db.sql(""" select ut.topic from `tabTopics` ts inner join `tabupcoming_topics` ut 
	on ut.parent=ts.name where ts.teacher=%(teacher)s and ts.standard=%(standard)s
	and ts.division=%(division)s and  ts.subject=%(subject)s and ts.status='Completed' order by ut.creation   """,
	values={'teacher':teacher,'standard':standard,'division':division,'subject':subject},as_dict=1)
	return c_topics

@frappe.whitelist()
def coming_topics(teacher,standard,division,subject):
	
	u_topics=frappe.db.sql(""" select ut.topic from `tabTopics` ts inner join `tabupcoming_topics` ut 
	on ut.parent=ts.name where ts.teacher=%(teacher)s and ts.standard=%(standard)s
	and ts.division=%(division)s and  ts.subject=%(subject)s and ts.status='New' order by ut.creation    """,
	values={'teacher':teacher,'standard':standard,'division':division,'subject':subject},as_dict=1)
	return u_topics
