# Quotis

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.

## Iteration 04

 * Start date: July 23, 2024
 * End date: Aug 4, 2024

## Process

During our fourth sprint iteration, we conducted a comprehensive sprint planning meeting. The meeting covered various topics and objectives. We allocated tasks according to a clearly defined development schedule. As a result, the team collaborated to thoroughly analyze our product backlog and the outcomes of our previous sprint. This collaborative effort enabled us to effectively estimate the planning for our fourth sprint, clearly outlining the roles of team members, events, and artifact production.

### Changes from previous iteration

* **Styling of User and Provider Dashboards**:
  - **Why**: We implemented this change to ensure a consistent and appealing layout for both user and provider dashboards.
  - **Success Metric**: The success of this change can be measured by user feedback on the new interface and overall usability improvements.

* **Filter by Distance for Service Search**:
  - **Why**: We added this feature to enhance the user experience by allowing users to find service providers within a specific range.
  - **Success Metric**: The success can be measured by the number of users utilizing the filter feature and the accuracy of search results.

* **Completion and Styling of Profile Pages**:
  - **Why**: We aimed to provide users and service providers with a well-designed and functional profile page.
  - **Success Metric**: The success can be measured by user satisfaction and the reduction in profile-related issues.

* **Review and Ratings System**:
  - **Why**: We implemented this feature to ensure accountability and quality of service.
  - **Success Metric**: The success can be measured by the number of reviews and ratings submitted and their impact on user behavior.

### Roles & Responsibilities

* **Zuhair**: Working on creating and styling the feed/dashboard/home page for the service provider. This involves displaying posts relevant to the service provider's field (e.g., plumbing posts for plumbers).
* **Mustafa**: Working on the profile page for the service provider, including a verification section where service providers can submit necessary documents for verification.
* **Danish**: Implementing the inbox/notification functionality for the service provider.
* **Mealad**: Developing the current jobs page for the service provider, where they can monitor job statuses and manage ongoing jobs.
* **Ji**: Working on the create a post and job completion page for the service provider, enabling them to send quotes and mark jobs as complete.

### Events

* **Daily Standup Meetings**: Every weekday at 9 PM Eastern Time to check up on everyone.
* **Tuesday Workshop Meetings**: In-person meetings to discuss ideas and potentially merge our code. Also, a good place for team members to sort out any major difficulties/matters.
* **Thursday Coding Sessions**: In-person coding sessions at Bladen Wing labs on campus where we all work together to code in person.
* **Quick Weekly Sync Meetings**: Each team responsible for a specific area will have weekly sync meetings, conducted online via Discord or in person, depending on the pair program's schedule.

### Artifacts

* **Jira**: Used to keep track of sprint progress and who is working on what tasks.
* **Slack**: Used for daily stand-up meetings, progress tracking, and to provide a platform for quick communication and help.
* **Google Calendar**: Provides a visual representation of the task schedule, aiding in effective work management and prioritization.
* **Discord**: Used for task assignments, real-time discussions, clarifications, and negotiations regarding task assignments.

### Git / GitHub workflow

Our team follows a structured Git/GitHub workflow to ensure smooth collaboration and avoid conflicts:

* **Development Branch**: All work for this sprint is pushed to a shared development branch. This branch serves as the primary branch where all new features are integrated.
* **Feature Branches**: Each team member works on their feature branch. This approach helps in maintaining clarity and traceability of individual tasks.
* **Pull Requests (PRs)**: Once a feature is completed, the team member creates a pull request to merge their changes into the development branch. The PR title includes the Jira ticket number for better traceability.
* **Review Process**: Pull requests are reviewed and discussed in team meetings before being merged into the development branch. This ensures that all team members are aware of the changes and can provide feedback.
* **Main Branch**: At the end of the sprint, once all features are integrated and tested, the development branch is merged into the main branch. This final merge is reviewed by the entire team.

## Product

### Goals and Tasks

Our primary goal for this iteration is to complete the user and service provider sides of the app, ensuring all features are fully functional and well-integrated. Here are the detailed goals and tasks:

1. **Styling and Completion of Dashboards**: 
   - **Tasks**: 
     - Style both user and provider dashboards for a consistent layout.
     - Ensure a user-friendly interface.
   - **User Stories**: 
     - As a user, I want the dashboard to have a clean and intuitive design so that I can easily navigate through it.
     - As a service provider, I want my dashboard to be styled and organized for easy access to job posts and updates.

2. **Filter by Distance for Service Search**:
   - **Tasks**: 
     - Implement the filter by distance feature for the service search to enhance user experience.
   - **User Stories**: 
     - As a user, I want to filter service providers by distance to find providers within a specific range.

3. **Completion and Styling of Profile Pages**:
   - **Tasks**: 
     - Complete and style both user and provider profile pages for a consistent and user-friendly layout.
   - **User Stories**: 
     - As a user, I want to update my profile information so that my details are accurate.
     - As a service provider, I want to update my profile with my skills, experience, and personal details to attract clients.

4. **Review and Ratings System**:
   - **Tasks**: 
     - Develop and integrate the review and ratings system for both users and providers to enhance accountability.
   - **User Stories**: 
     - As a user, I want to leave reviews and ratings for service providers.
     - As a service provider, I want to manage my reviews and ratings to ensure a positive reputation and attract more clients.

5. **Provider Inbox Page**:
   - **Tasks**: 
     - Develop and style the provider inbox page to display notifications about job quotes and updates.
   - **User Stories**: 
     - As a service provider, I want to receive notifications about job requests and updates.

### Artifacts

* **Mock-ups for User Interface (UI) Design**: Created using Figma for design mock-ups to visualize the UI flow. Canva is used for logo creation.
* **Database Schema**: Designed using Figma to create a visual representation of the database schema for Quotis. This diagram facilitated the preparation and correctness of the database design.
* **API Documentation**: Documented API endpoints for login, registration, posting jobs, and profile management to ensure clear communication between the frontend and backend teams. Tools like Postman were used to provide thorough documentation for the Quotis backend API.
* **Contribution Instructions**: Provided guidelines for setting up the development environment, choosing branch names, tracking issues, and using the pull request system. This facilitated an organized and cooperative contribution workflow.
* **Expo Emulator**: Used on the web to demonstrate our running app and ensure seamless integration of all features.
