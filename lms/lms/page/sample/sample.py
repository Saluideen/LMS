import frappe
# def get_context(context):
#     session_user = frappe.session.user

#     # Retrieve additional user details
#     user_details = frappe.get_doc("User", session_user)

#     # Pass the user details to the context
#     context.session_user = session_user
#     context.full_name = user_details.full_name
#     context.email = user_details.email
#     # Add any other user details you requ
#   # Create a custom button
#   context.custom_buttons = [
#     {
#       'label': 'Custom Button',
#       'onclick': 'your_custom_function()',
#       'icon': 'fa fa-star',
#       'style': 'color: red;'
#     }
#   ]
#    return context



def get_context(context):
    # Fetch the user profile details
    user_profile = frappe.get_doc("User", frappe.session.user).as_dict()
    print("user_profile".user_profile)

    # Pass the user profile details to the context
    context.user_profile = user_profile
    # Add any other profile details you require

    # Render the page with the updated context
    return context

