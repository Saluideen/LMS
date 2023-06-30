// Copyright (c) 2023, LMS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Student Time Table', {
	refresh: function(frm) {
		
		frappe.call({
			method: 'lms.lms.doctype.student.student.get_data',
			args: {
				user: frappe.session.user
			},
			callback: function(r) {
				console.log(r);
				console.log(r.message[0].standard);
				frm.set_value("standard",r.message[0].standard)
				frm.refresh_field("standard")
				frm.set_value("division",r.message[0].division)
				frm.refresh_field("division")
			}
		});
				
		
			},
			standard:function(frm){
				frm.trigger("time_table")
			},
			division:function(frm){
				frm.trigger("time_table")
			},
		time_table:function(frm){
			if((frm.doc.standard)&&(frm.doc.division)){
				frappe.call({
					method: 'lms.lms.doctype.student_time_table.student_time_table.get_time_table',
					args: {
						
						standard:frm.doc.standard,
						division:frm.doc.division
					},
					callback: function(r) {
						console.log(r);
						if (r.message.length > 0) {
							r.message.forEach(el => {
								if(el.day=="Monday"){

								
								let found = false
								if (frm.doc.monday_time_table) {
									found = frm.doc.monday_time_table.find(function (record) {
										if (record.hour == el.hour )
											return true;
									});
								}
								if (!found) {
								frm.add_child('monday_time_table',{
									hour:el.hour,
									
t_name:el.t_name,
									from_time:el.from_time,
									to_time:el.to_time,
									subject:el.subject
		
								})
								frm.refresh_field('monday_time_table')
							}
						}
						if(el.day=="Tuesday"){

								
							let found = false
							if (frm.doc.tuesday_time_table) {
								found = frm.doc.tuesday_time_table.find(function (record) {
									if (record.hour == el.hour )
										return true;
								});
							}
							if (!found) {
							frm.add_child('tuesday_time_table',{
								hour:el.hour,
								
t_name:el.t_name,
								from_time:el.from_time,
								to_time:el.to_time,
								subject:el.subject
	
							})
							frm.refresh_field('tuesday_time_table')
						}
					}
					if(el.day=="wednesday"){

								
						let found = false
						if (frm.doc.wednesday_time_table) {
							found = frm.doc.wednesday_time_table.find(function (record) {
								if (record.hour == el.hour )
									return true;
							});
						}
						if (!found) {
						frm.add_child('wednesday_time_table',{
							hour:el.hour,
							
t_name:el.t_name,
							from_time:el.from_time,
							to_time:el.to_time,
							subject:el.subject

						})
						frm.refresh_field('wednesday_time_table')
					}
				}
				if(el.day=="Thursday"){

								
					let found = false
					if (frm.doc.thursday_time_table) {
						found = frm.doc.thursday_time_table.find(function (record) {
							if (record.hour == el.hour )
								return true;
						});
					}
					if (!found) {
					frm.add_child('thursday_time_table',{
						hour:el.hour,
						
t_name:el.t_name,
						from_time:el.from_time,
						to_time:el.to_time,
						subject:el.subject

					})
					frm.refresh_field('thursday_time_table')
				}
			}
			if(el.day=="Friday"){

								
				let found = false
				if (frm.doc.friday_time_table) {
					found = frm.doc.friday_time_table.find(function (record) {
						if (record.hour == el.hour )
							return true;
					});
				}
				if (!found) {
				frm.add_child('friday_time_table',{
					hour:el.hour,
					
t_name:el.t_name,
					from_time:el.from_time,
					to_time:el.to_time,
					subject:el.subject

				})
				frm.refresh_field('friday_time_table')
			}
		}
		if(el.day=="Saturday"){

								
			let found = false
			if (frm.doc.saturday_time_table) {
				found = frm.doc.saturday_time_table.find(function (record) {
					if (record.hour == el.hour )
						return true;
				});
			}
			if (!found) {
			frm.add_child('saturday_time_table',{
				hour:el.hour,
				
t_name:el.t_name,
				from_time:el.from_time,
				to_time:el.to_time,
				subject:el.subject

			})
			frm.refresh_field('saturday_time_table')
		}
	}
							})
							
								}
						
					}
				}); 
		}
		}
			
		});
		
