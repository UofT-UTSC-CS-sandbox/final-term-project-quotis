# Quotis

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
> It does not make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.

## Iteration 02

* Start date: June 25, 2024
* End date: July 7, 2024

## Process

During our second sprint iteration, we conducted a comprehensive sprint planning meeting. The meeting covered a variety of different topics and objectives. We allocated tasks according to a clearly defined development schedule. As a result, the team collaborated to thoroughly analyze our product backlog and the outcomes of our initial sprint. This collaborative effort enabled us to effectively estimate the planning for our second sprint, clearly outlining the roles of team members, events, and artifact production.

### Changes from previous iteration

* **Refinement of User Stories**: 
  - **Why**: We are making this change to address the generalized user stories requiring further breakdown into separate tasks and stories. By doing so, we aim to improve clarity and accuracy for team members.
  - **Success Metric**: The success of this change can be measured by tracking the number of user stories that undergo refinement iterations and assessing the overall satisfaction of the team.
  
* **Improved Database Design**:
  - **Why**: We refined our database schema by adding a `notifications` array to the user data to make displaying the inbox in chronological order and some other benefits easier. For user data, we now store first name and last name, and encrypt the passwords in our database.
  - **Success Metric**: The success can be measured by assessing the ease of implementing new features and the efficiency of querying the database.

* **Enhancement of Pair Programming**:
  - **Why**: We decided to enhance our pair programming sessions to ensure smoother integration and implementation of features.
  - **Success Metric**: The success can be measured by the number of successful integrations and reduced merge conflicts.

### Roles & Responsibilities

* **Zuhair**: Working on the dashboard to finish implementing quotes functionality and styling. This involves ensuring the dashboard is functional and user-friendly, enabling users to view and manage their quotes efficiently. 
* **Mustafa**: Completing the profile section of the app. This includes enabling users to edit their personal information such as name and address, ensuring data is accurately saved and retrieved from the database.
* **Danish**: Completing the functionality of the login and registration processes, resolving any associated database issues, and completing the inbox page. This involves ensuring secure user authentication, smooth registration, and effective management of user sessions. The inbox page will enable users to view notifications in chronological order.
* **Mealad**: Working on the services page which includes querying and searching for service providers. This involves implementing search functionalities that allow users to find service providers based on various criteria, ensuring a seamless user experience.
* **Ji**: Working on the create a post and job completion page. This includes enabling users to post job requests and mark them as complete once the service is provided. Ensuring that these functionalities work smoothly is crucial for user satisfaction and app reliability.

Each team member's work is interconnected, contributing to the overall functionality of the app. For instance, the dashboard relies on accurate data from the profile section, and the inbox functionality depends on successful user authentication and database management.

### Events

* **Daily Standup Meetings**: Every weekday at 9 PM Eastern Time to check up on everyone.
* **Tuesday Workshop Meetings**: In-person meetings to discuss ideas and potentially merge our code. Also, a good place for team members to sort out any major difficulties/matters.
* **Thursday Coding Sessions**: In-person coding sessions that will take place in one of the Bladen Wing labs on campus where we all work together to code in person. The session aims to foster open discussions, encourage idea-sharing, facilitate collaboration to overcome obstacles, and maximize productivity as a cohesive group.
* **Quick Weekly Sync Meetings**: Each team responsible for a specific area will have weekly sync meetings. These meetings will be conducted either online via Discord or in person, depending on the pair program's schedule. The purpose of these sync meetings is to enable developers to stay connected and collaborate on the development progress of their respective features.

### Artifacts

* **Jira**: Used to keep track of sprint progress and who is working on what tasks.
* **Slack**: Used for daily stand-up meetings, progress tracking, and to provide a platform for quick communication and help.
* **Google Calendar**: Provides a visual representation of the task schedule, aiding in effective work management and prioritization.
* **Discord**: Used for task assignments, real-time discussions, clarifications, and negotiations regarding task assignments.

### Git / GitHub workflow

Our team follows a structured Git/GitHub workflow to ensure smooth collaboration and avoid conflicts:

* **Development Branch**: All work for this sprint is pushed to a shared development branch. This branch serves as the primary branch where all new features are integrated.
* **Feature Branches**: Each team member works on their feature branch. This approach helps in maintaining clarity and traceability of individual tasks.
* **Pull Requests (PRs)**: Once a feature is completed, the team member creates a pull request to merge their changes into the development branch. The PR title includes the name and Jira reference for better traceability.
* **Review Process**: Pull requests are reviewed and discussed in team meetings before being merged into the development branch. This ensures that all team members are aware of the changes and can provide feedback.
* **Main Branch**: At the end of the sprint, once all features are integrated and tested, the development branch is merged into the main branch. This final merge is reviewed by the entire team.

### Goals and Tasks

Our primary goal for this iteration is to complete the user side of the app, ensuring all features for user interaction with the app are fully functional and well-integrated. Here are the detailed goals and tasks:

1. **Dashboard Implementation**: 
   - **Tasks**: 
     - Implement quotes functionality.
     - Style the dashboard to ensure a user-friendly interface.
   - **User Stories**: 
     - As a user, I want to view all my quotes on the dashboard so that I can manage them efficiently.
     - As a user, I want the dashboard to have a clean and intuitive design so that I can easily navigate through it.

2. **Profile Completion**:
   - **Tasks**: 
     - Enable users to edit personal information.
     - Ensure data is saved and retrieved correctly from the database.
   - **User Stories**: 
     - As a user, I want to update my profile information so that my details are accurate.
     - As a user, I want my profile changes to be saved reliably so that my information is always up-to-date.

3. **Login and Registration**:
   - **Tasks**: 
     - Complete login functionality with secure authentication.
     - Implement the registration process with necessary validations.
     - Resolve any associated database issues.
   - **User Stories**: 
     - As a new user, I want to register with my details so that I can create an account.
     - As a returning user, I want to log in securely so that I can access my account.

4. **Inbox Page**:
   - **Tasks**: 
     - Implement inbox functionality to display notifications.
     - Ensure notifications are displayed in chronological order.
   - **User Stories**: 
     - As a user, I want to view my notifications in the inbox so that I am aware of any updates or messages.
     - As a user, I want my notifications to be sorted by date so that I can see the most recent ones first.

5. **Services Page**:
   - **Tasks**: 
     - Implement search functionality for service providers.
     - Ensure users can query and filter results based on various criteria.
   - **User Stories**: 
     - As a user, I want to search for service providers based on specific criteria so that I can find the right provider for my needs.
     - As a user, I want the search results to be accurate and relevant so that I can make informed decisions.

6. **Create a Post**:
   - **Tasks**: 
     - Implement functionality to create a post.
     - Implement functionality to mark a job as complete.
   - **User Stories**: 
     - As a user, I want to create a post describing my job requirements so that service providers can respond to my request.
     - As a user, I want to mark a job as complete once it is done so that I can keep track of finished tasks.

### Artifacts

* **Mock-ups for User Interface (UI) Design**: Created using draw.io for the visual representation of the database schema and Figma for design mock-ups to visualize the UI flow. Canva is used for logo creation.
* **Database Schema**: Designed using Figma to create a visual representation of the database schema for Quotis. This diagram facilitated the preparation and correctness of the database design.
* **API Documentation**: Documented API endpoints for login, registration, posting jobs, and profile management to ensure clear communication between the frontend and backend teams. Tools like Postman were used to provide thorough documentation for the Quotis backend API.
* **Contribution Instructions**: Provided guidelines for setting up the development environment, choosing branch names, tracking issues, and using the pull request system. This facilitated an organized and cooperative contribution workflow.
* **Expo Emulator**: Used on the web to demonstrate our running app and ensure seamless integration of all features.

This detailed plan ensures that our team is well-organized and that each member knows their responsibilities, leading to a successful sprint and a functional user side of the Quotis app.
