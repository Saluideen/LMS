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
			# {
	# 	"fieldname": "date",
	# 	"label": "Date",
	# 	"fieldtype": "Date",	
	# 	"width": 150
	# },

	# 	{
	# 	"fieldname": "date",
	# 	"label": "Date",
	# 	"fieldtype": "Date",	
	# 	"width": 150
	# },
		{
		"fieldname": "hour",
		"label": "Scheduled Hours",
		"fieldtype": "Data",	
		"width": 150
	},
	{
		"fieldname": "a_hour",
		"label": "Attended Hours",
		"fieldtype": "Data",	
		"width": 150
	},
	# ,
		{
		"fieldname": "student",
		"label": "Total Students",
		"fieldtype": "Data",	
		"width": 150
	},
	# ,
		{
		"fieldname": "p_student",
		"label": "No:of presents",
		"fieldtype": "Data",	
		"width": 150
	},
	{
		"fieldname": "a_student",
		"label": "No:of absents",
		"fieldtype": "Data",	
		"width": 150
	},
	{
		"fieldname": "t_performance",
		"label": "Teacher Performance(%)",
		"fieldtype": "Data",	
		"width": 150
	}
	
	
	]

def get_data(filters):

	data=[]
	name = filters['name']
	



	from_date=datetime(2000,1,1,0,0,0)
	if 'from_date' in filters:
		from_date=filters["from_date"]
		from_date = datetime.strptime(from_date,'%Y-%m-%d')
		from_date1 = from_date.strftime('%Y-%m-%d')
		
	to_date=datetime(2000,1,1,0,0,0)
	if 'to_date' in filters:
		to_date=filters["to_date"]
		to_date = datetime.strptime(to_date,'%Y-%m-%d')
		to_date1 = to_date.strftime('%Y-%m-%d')



	days=frappe.db.sql(""" select t.day,count(ts.hour) from  `tabTime Table` t inner join `tabTime Tables` ts on ts.parent=t.name 
	where ts.teacher=%(teacher)s  group by t.day""",values={'teacher':name},as_dict=1)
	print(days)
	day_count=count_days(from_date,to_date)
	print(day_count)
	s=0
	for day in days:
		day_name = day['day']
		if day_name in day_count:
			c=day['count(ts.hour)']
			c1=day_count[day_name]
			s1=c*c1
		s=s+s1
		print(s)
			# print(c)
			# print(c1)
			# print(c*c1)
# 	attended_hours=frappe.db.sql("""select count(*) from `tabAttandance` where owner IN(
# 		select email from `tabTeacher` where name=%(name)s
# 	)""",values={'name':name},as_dict=1)
# 	print("attended_hours",attended_hours)
# 	student_status_count=("""select count(at.name1)as student,
# 	count(case when at.status="Absent" then 1 end )as absent,
# count(case when at.status="Present" then 1 end )as present
# from `tabAttandance` a inner join `tabAttandance_table` at 
# on at.parent=a.name where at.owner in(select email from `tabTeacher` where name=%(name)s
# 	)""",values={'name':name},as_dict=1)
	data1=frappe.db.sql( """
	SELECT
		(SELECT COUNT(*) FROM `tabAttandance` WHERE owner IN (
			SELECT email FROM `tabTeacher` WHERE name = %(name)s
		)) AS attended_hours,
		COUNT(at.name1) AS student,
		COUNT(CASE WHEN at.status = 'Absent' THEN 1 END) AS absent,
		COUNT(CASE WHEN at.status = 'Present' THEN 1 END) AS present
		FROM
			`tabAttandance` a
		INNER JOIN
			`tabAttandance_table` at ON at.parent = a.name
		WHERE
			at.owner IN (SELECT email FROM `tabTeacher` WHERE name = %(name)s)
			and a.date BETWEEN %(from_date)s AND %(to_date)s 
		""", values={'name': name,'from_date':from_date1,'to_date':to_date1}, as_dict=1)
	
	
	print(data1)
	for d in data1:
		if d['student']:
			

				teacher_performance=(d['attended_hours']/s)*((d['present'])/(d['student']))*100
				print("teacher_performance",teacher_performance)
				data.append({'hour':s,'a_hour':d['attended_hours'],'student':d['student'],
					'p_student':d['present'],'a_student':d['absent'],'t_performance':teacher_performance})

		else:
			frappe.throw("Not Found")
		
	

	return data

	





	# total_hours=frappe.db.sql("""select t.count(*) as t_count from `tabTime Tables` t where teacher=%(teacher)s  """,
	# values={'teacher':name},as_dict=1)
	# print(total_hours)
	# for h in total_hours:
	# 	data.append({'hour':h['count']})
	# attended_hours=frappe.db.sql("""select count(*) as count from `tabAttandance_table`
	#  where modified_by IN (SELECT email FROM `tabTeacher` WHERE name = %(name)s)  group by parent """,values={'name':name},as_dict=1)
	# for ah in attended_hours:
	# 	data.append({'a_hour':ah['count']})
	# # 	performance=frappe.db.sql("""
	# 	SELECT 
    #     SUM(CASE WHEN at.status = 'Absent' THEN 1 ELSE 0 END) AS absent_count,
    #     SUM(CASE WHEN at.status = 'Present' THEN 1 ELSE 0 END) AS present_count FROM `tabAttandance` a
    # INNER JOIN `tabAttandance_table` at ON at.parent = a.name
    # WHERE a.date BETWEEN %(from_date)s AND %(to_date)s
    # AND at.modified_by IN (SELECT email FROM `tabTeacher` WHERE name = %(name)s)
    # GROUP BY at.status, a.date, at.name1
    # """,
    # values={
    #     'from_date': from_date,
    #     'to_date': to_date,
    #     'name': name,
    # },
    # as_dict=True
	# 	)
	# print(performance)
	# data = {
	# 	'absent_count': performance[0]['absent_count'],
	# 	'present_count': performance[0]['present_count']
	# }


# 		attendance = frappe.db.sql("""
# 			SELECT at.status, a.date, a.hours,at.name1,a.standard,a.division
# 			FROM `tabAttandance` a
# 			INNER JOIN `tabAttandance_table` at ON at.parent = a.name
# 			WHERE a.date BETWEEN %(from_date)s AND %(to_date)s
			
# 			AND standard = %(standard)s
# 			AND division = %(division)s and at.modified_by IN(select email from `tabTeacher` where name=%(name)s )
# 			""",
# 			values={
# 				'from_date': from_date,
# 				'to_date': to_date,
# 				'name': name,
# 				'standard': standard,
# 				'division': division
# 			},
# 			as_dict=True
# )

		
# 		


def count_days(from_date, to_date):
	print("count")
	Monday = 0
	Tuesday = 0
	Wednesday = 0
	Thursday = 0
	Friday = 0
	Saturday = 0
	current_date = from_date
	while current_date <= to_date:
		if current_date.weekday() == 0: 
			Monday += 1
		elif current_date.weekday() == 1:  
			Tuesday += 1
		elif current_date.weekday() == 2:
			Wednesday += 1
		elif current_date.weekday() == 3:
			Thursday += 1
		elif current_date.weekday() == 4:
			Friday += 1
		elif current_date.weekday() == 5:
			Saturday += 1
		current_date += timedelta(days=1)

	return {'Monday': Monday,'Tuesday': Tuesday,'Wednesday': Wednesday,'Thursday': Thursday,'Friday': Friday,'Saturday': Saturday}