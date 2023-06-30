# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from datetime import date,datetime,timedelta

def execute(filters=None):
	columns, data = [], []
	columns=get_column()
	data =get_data(filters)
	return columns, data

def get_column():
	return [
		{
		"fieldname": "date",
		"label": "Date",
		"fieldtype": "Date",	
		"width": 150
	},
		{
		"fieldname": "hour",
		"label": "Hour",
		"fieldtype": "Data",	
		"width": 150
	},{
		"fieldname": "status",
		"label": "Status",
		"fieldtype": "Data",	
		"width": 150
	},

	# {
	# 	"fieldname": "count",
	# 	"label": "Count",
	# 	"fieldtype": "Data",	
	# 	"width": 150
	# },
	
	
	]

def get_data(filters):

	data=[]
	name = filters['name']
	standard=filters['standard']
	division=filters['division']



	from_date=datetime(2000,1,1,0,0,0)
	if 'from_date' in filters:
		from_date=filters["from_date"]
		from_date = datetime.strptime(from_date,'%Y-%m-%d')
		from_date = from_date.strftime('%Y-%m-%d')
		
	to_date=datetime(2000,1,1,0,0,0)
	if 'to_date' in filters:
		to_date=filters["to_date"]
		to_date = datetime.strptime(to_date,'%Y-%m-%d')
		to_date = to_date.strftime('%Y-%m-%d')

		attendance = frappe.db.sql("""
			SELECT at.status, a.date, a.hours
			FROM `tabAttandance` a
			INNER JOIN `tabAttandance_table` at ON at.parent = a.name
			WHERE a.date BETWEEN %(from_date)s AND %(to_date)s
			AND name1 iN (select name1 from `tabStudent` where name=%(name)s)
			AND standard = %(standard)s
			AND division = %(division)s
			""",
			values={
				'from_date': from_date,
				'to_date': to_date,
				'name': name,
				'standard': standard,
				'division': division
			},
			as_dict=True
)

		
		for a in attendance:
			data.append({'date':a['date'],'hour':a['hours'],'status':a['status']})


	
	

	return data
@frappe.whitelist()
def get_student(doctype, txt, searchfield, start, page_len, filters):
	return frappe.db.sql("""SELECT name,name1 FROM `tabStudent` order by name """)
