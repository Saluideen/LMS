// frappe.pages[''].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'LMS',
// 		single_column: true
		
// 	});
	
// }
frappe.pages['sample'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
	  parent: wrapper,
	  title: 'LMS',
	  single_column: true
	});
  
	// Create a custom button
	wrapper.page.add_inner_button(__('Get Time Table'), function() {
	  // Get the current user's standard
	  frappe.call({
		method: 'lms.lms.doctype.sample.sample.get_details',
		args: {
		 
		 'user':frappe.session.user
		},
		callback: function(response) {
		  var userStandard = response.message.standard;
  
		  // Navigate to the Time Table doctype with filters
		  frappe.set_route('List', 'Time Table', { standard: userStandard });
		}
	  });
	});
  };
  

// frappe.pages['sample'].on_page_load = function(wrapper) {
// 	// Fetch the user profile details using the frappe.request method
// 	frappe.request({
// 	  method: 'GET',
// 	  url: '/api/resource/User/' + frappe.session.user,
// 	  callback: function(response) {
// 		console.log(response);
// 		var user_profile = response;
// 		console.log(user_profile);
// 		// Display the user profile details in the page
// 		if (user_profile) {
// 		  wrapper.page.main.find('.your-profile-element').text(user_profile.name1);
// 		  // Add any other profile details you want to display
// 		}
// 	  }
// 	});
//   };