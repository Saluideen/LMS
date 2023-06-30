# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Student(Document):
	# pass
	def on_update(self):
		if not self.user:
			user = frappe.new_doc('User') 
			user.email = self.email
			user.first_name = self.name1
			user.send_welcome_email=False
			user.new_password = self.get_password('password')
			user.append('roles',{'role':'Student'})
			
			
				
			inserted_user=user.insert(ignore_permissions=True)

			if(inserted_user):
				inserted_user.user_type='System User'
				inserted_user.module_profile='LMS Profile Module'
				updated_user=inserted_user.save(ignore_permissions=True)
		
			self.user=inserted_user.name
			self.db_update()
		else:
			user = frappe.get_doc('User',self.user)
			user.first_name = self.name1
			user.new_password = self.get_password('password')
			user.roles=None
			user.append('roles',{'role':'Student'})
			
			updated_user=user.save(ignore_permissions=True)
@frappe.whitelist()
def get_data(user):
	data=frappe.db.sql("""select name1,standard,division from `tabStudent` where user=%(user)s """
	,values={'user':user},as_dict=1)
	return data
