/* 
Front end to contain login access to user dashboard if visitor is user (at least clearance level 5). Only clearance level 1 can see donation analytics on user dashboard.

1. It should contain a base route ('localhost:4000') to serve the angular application
2. The other api routes should begin at the 'localhost:4000/api' route
3. It should have the following api endpoints:

    a) '/api/site/' to manage dynamic content for the website:

        1) '/api/site/home/' to manage home page content (get, post, patch)
            * get method should return status 200 and json object in line with the home interface.
            * If the dto is not in line with the home interface, post method should fail and return error message "bad request body format for home content object".
            * If there is already an existing home subdocument in the donate collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * get request comes with client IP address and searches for it in users collection and visits collection

        2) '/api/site/about/' to manage about page content (get, post, patch)

            * get method should return status 200 and json object in line with the about interface.
            * If the dto is not in line with the about interface, post method should fail and return error message "bad request body format for about content object".
            * If there is already an existing home subdocument in the donate collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        3) '/api/site/projects/' to manage project(causes) page content (get, post, patch)

            * get method should return status 200 and json object in line with the home interface.
            * If the dto is not in line with the projects interface, post method should fail and return error message "bad request body format for projects content object".
            * If there is already an existing projects subdocument in the donate collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        4) '/api/site/donate/' to manage donation page content (get, post, patch)

            * get method should return status 200 and json object in line with the donate interface.
            * If the dto is not in line with the donate interface, post method should fail and return error message "bad request body format for home content object".
            * If there is already an existing donate subdocument in the site collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        5) '/api/site/blog/' to manage blog page content (get, post, patch)

            * get method should return status 200 and json object in line with the blog interface.
            * If the dto is not in line with the blog interface, post method should fail and return error message "bad request body format for blog object".
            * If there is already an existing blog subdocument in the site collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        6) '/api/site/galleries/' to manage galleries page content (get, post, patch)

            * get method should return status 200 and json object in line with the galleries interface.
            * If the dto is not in line with the galleries interface, post method should fail and return error message "bad request body format for galleries object".
            * If there is already an existing galleries subdocument in the site collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        7) '/api/site/events/' to manage events page content (get, post, patch)

            * get method should return status 200 and json object in line with the events interface.
            * If the dto is not in line with the events interface, post method should fail and return error message "bad request body format for events object".
            * If there is already an existing events subdocument in the site collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection
            
        8) '/api/site/contact/' to manage contact us page content (get, post, patch)

            * get method should return status 200 and json object in line with the contact interface.
            * If the dto is not in line with the contact interface, post method should fail and return error message "bad request body format for contact object".
            * If there is already an existing contact subdocument in the site collection, Post method should fail and return error message "It already exists, you can only edit".
            * If an empty property is sent, Patch method should fail and return error message "You cannot leave any field empty".
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Post method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Patch method should fail and return error message "Unauthorized!!!".
            * there should not be a delete http method on this route.
            * * get request comes with client IP address and searches for it in users collection and visits collection

    b) '/api/admin/' for general site administration:

        1) '/api/admin/users/' to manage users on the site (get, post, put, delete)

            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Get method should fail and return error message "Unauthorized!!!" .
            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to 5, Post, Put and Delete methods should fail and return error message "Unauthorized!!!" .
            * users signup and signin must involve the use of json webtokens.
            * signup post request handler should end with sending an email verification link to the provided email address.
            * If signup mail fails to deliver, sign up should not return 200 status but throw error with message "Either email does not exist or your email host server is down."
            * signup post request should also end with a 200 status and a message text response reading "One last step ): please check your email to complete the process" 
            * passwords must be encrypted before saving to database
            * webtokens should be set to last for 1 day.
            * if a prospecting user provides an email that already exists in database, signup post request should fail with error message "user with {email} already exists "
            * If the dto is not in line with the user interface, post method should fail and return error message "bad request body format for user object".
            * changePassword / forgotPassword get request should send page link to user by mail
            * get requests to changePassword / forgotPassword that do not originate from the user's given email address should fail and return status code 404 and error message "Unauthorized access !!!" 
            * use set interval to calculate update interest property in the user database every 4 months. Page with highest visits apart from home page is interest.
            
        2) '/api/admin/residents/' to manage members/beneficiaries of the ministry (get, post, put, delete)

            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Get, Post, Put and Delete methods should fail and return error message "Unauthorized!!!" .
            * get method should return status 200 and json object in line with the residents interface.
            * If the dto is not in line with the residents interface, post method should fail and return error message "bad request body format for residents object".
            
        3) '/api/admin/donation/' to manage donations in the ministry (get, post, put, delete)

            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Get, Post, Put and Delete methods should fail and return error message "Unauthorized!!!" .
            * get method should return status 200 and json object in line with the donation interface.
            * If the dto is not in line with the donation interface, post method should fail and return error message "bad request body format for residents object".
            * the donation Post request should be triggered by the payment gateway of choice.
            * use event emiter and listiners to notify of every successful donation and update the donation analytics database collection on each event.
            * Recalculate daily, monthly, quarterly and annual summaries of donation analytics database collection with set interval.
            * on Each successful donation Post, get IP Location of the donor from the client and save to database.

        4) '/api/admin/projects/' to manage projects in the ministry (get, post, put, delete)

            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Get, Post, Put and Delete methods should fail and return error message "Unauthorized!!!" .
            * get method should return status 200 and json object in line with the project's interface.
            * If the dto is not in line with the project's interface, post method should fail and return error message "bad request body format for project's object".

        5) '/api/admin/events/' to manage events in the ministry (get, post, put, delete)

            * if the request header does not contain a valid authorization token recognising a user with an 'accessLevel' equal to or greater than 4, Get, Post, Put and Delete methods should fail and return error message "Unauthorized!!!" .
            * get method should return status 200 and json object in line with the events interface.
            * If the dto is not in line with the events interface, post method should fail and return error message "bad request body format for event object".
            
        6) '/api/admin/visits/' to monitor page visits statistics (get, post)

        * Recalculate daily, monthly, quarterly and annual summaries of visits analytics database collection with set interval.
        

*/
