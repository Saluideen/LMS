# Copyright (c) 2023, LMS and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Teacher(Document):
	def on_update(self):
		if not self.user:
			user = frappe.new_doc('User')
			user.email = self.email
			user.first_name = self.name1
			user.send_welcome_email=False
			user.new_password = self.get_password('password')
			user.append('roles',{'role':'Teacher'})
			user_roles=[]
			user_branch=[]
			
				
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
			user.append('roles',{'role':'Teacher'})
			
			updated_user=user.save(ignore_permissions=True)


