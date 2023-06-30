// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt
let coming_topic =[]
let completed_topic=[]
frappe.ui.form.on('Get Topics', {
	refresh: function(frm) {
		

		frm.disable_save()
		if((frappe.user_roles.includes('Teacher')))
		{
			frappe.call({
				method: "lms.lms.doctype.teacher_time_table.teacher_time_table.get_teacher",
			   args:
			   {
				   'user':frappe.session.user
			   },
			   callback: function (r) {
				console.log(r);
				console.log(r.message[0].name);
				   frm.set_value("teacher",r.message[0].name)
				
			   }
			
			})

		}
		if((frappe.user_roles.includes('Student')))
		{
			frappe.call({
				method: 'lms.lms.doctype.student.student.get_data',
				args: {
					user: frappe.session.user
				},
				callback: function(r) {
				
					
					frm.set_value("standard",r.message[0].standard)
					frm.refresh_field("standard")
					frm.set_value("division",r.message[0].division)
					frm.refresh_field("division")
				}
			});
				
		}
		if((frappe.user_roles.includes('Teacher')) && (!frm.is_new()))
		{
			frm.add_custom_button("Complete",function(){
				frm.doc.status="Completed"
				frm.dirty()
				frm.save()
				frm.disable_form()
			})
			frm.change_custom_button_type("Complete", null, "primary");

		}
		
		if(frappe.user_roles.includes('Student')){
			frm.set_df_property("day","hidden",1)
			frm.set_df_property("standard","hidden",1)
			frm.set_df_property("division","hidden",1)
			frm.set_df_property("hour","hidden",1)
			frm.set_df_property("teacher","hidden",0)
			frm.set_df_property("subject","hidden",0)

			// frm.disable_form()
			// frm.disable_save()
			

		}
		

	},
	standard:function(frm){
		frm.trigger("completed_topics")
		frm.trigger("coming_topics")
	},
	division:function(frm){
		frm.trigger("completed_topics")
		frm.trigger("coming_topics")
	},
	teacher:function(frm){
		frm.trigger("completed_topics")
		frm.trigger("coming_topics")

		
	},
	subject:function(frm){
		frm.set_query('teacher', function () {
			return {
				query: "lms.lms.doctype.time_table.time_table.get_teacher",
				filters: { 'subject': frm.doc.subject }
			};
		});
		frm.trigger("completed_topics")
		frm.trigger("coming_topics")
	},
	completed_topics:function(frm){
		if((frm.doc.teacher)&&(frm.doc.subject)&&(frm.doc.standard)&&(frm.doc.division))
		{
			
	frappe.call({
		method: "lms.lms.doctype.topics.topics.completed_topics",
	   args:
	   {
		   'teacher':frm.doc.teacher,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		   'subject':frm.doc.subject
		   
	   },
	   callback: function (r) {
		console.log("fdhfh ----completed",r);
		if (r.message.length > 0)
		{
			r.message.forEach(el=> {
				let found = false
			if (frm.doc.completed_topic) {
				found = frm.doc.completed_topic.find(function (record) {
					if (record.topic == el.topic )
						return true;
				});
			}
			if (!found) {
			frm.add_child('completed_topic',{
				topic:el.topic,
				


			})
			frm.refresh_field('completed_topic')
		}
	
	
				
			});
			

		}
		
		
		
	   }
	});

		}

	},
	coming_topics:function(frm){
		if((frm.doc.teacher)&&(frm.doc.subject)&&(frm.doc.standard)&&(frm.doc.division))
		{
			
	frappe.call({
		method: "lms.lms.doctype.topics.topics.coming_topics",
	   args:
	   {
		   'teacher':frm.doc.teacher,
		   'standard':frm.doc.standard,
		   'division':frm.doc.division,
		   'subject':frm.doc.subject
		   
	   },
	   callback: function (r) {
		if (r.message.length > 0)
		{

			r.message.forEach(el=> {
				// coming_topic.push(el.topics)
				// frm.set_value("coming",coming_topic)
				let found = false
			if (frm.doc.upcoming_topics) {
				found = frm.doc.upcoming_topics.find(function (record) {
					if (record.topic == el.topic )
						return true;
				});
			}
			if (!found) {
			frm.add_child('upcoming_topics',{
				topic:el.topic,
				
			})
			frm.refresh_field('upcoming_topics')
		}
	
	
				
			});
			

		}
		
		
		
	   }
	});

		}

	},
});
