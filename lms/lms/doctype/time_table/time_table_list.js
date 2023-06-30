frappe.listview_settings['Time Table'] = {
	// filters:[["division","!=", "A"]],
    // onload: function (listview) {
    //     frappe.route_options = { "standard": ["=","1"] };
       
            
        
    // },
    refresh:function(listview)
    {
        listview.page.add_inner_button('GET TIME TABLE', function() {
           
                    
                      
        });
    

    },


    onload: function(listview) {
       
        frappe.call({
            method: 'lms.lms.doctype.student.student.get_data',
            args: {
                user: frappe.session.user
            },
            callback: function(response) {
                
                let filterData = response.message[0].standard;
                let division=response.message[0].division
                
                if(filterData )

                {
                    console.log(division)
                    // frappe.route_options = { "standard": ["=",filterData] };
                    console.log("before",frappe.route_options); // Log before assignment
            frappe.route_options = { "division": ["=", division] };
           
            console.log("after",frappe.route_options); // Log after assignment
            // listview.filters = [['Division', '=', "A"]];
            // listview.refresh();
                }
                
                  
                
            }
        });
    }
};