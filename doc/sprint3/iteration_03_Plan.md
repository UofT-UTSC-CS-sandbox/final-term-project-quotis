# Quotis

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.

## Iteration 03

 * Start date: July 9, 2024
 * End date: July 21, 2024

## Process

During our third sprint iteration, we conducted a comprehensive sprint planning meeting. The meeting covered various topics and objectives. We allocated tasks according to a clearly defined development schedule. As a result, the team collaborated to thoroughly analyze our product backlog and the outcomes of our previous sprint. This collaborative effort enabled us to effectively estimate the planning for our third sprint, clearly outlining the roles of team members, events, and artifact production.

### Changes from previous iteration

* **Introduction of Jira Ticket Numbers for Branch Names and Commit Messages**:
  - **Why**: We implemented this change to improve traceability and organization in our workflow. By referring to Jira ticket numbers in branch names and commit messages, we aim to streamline tracking and review processes.
  - **Success Metric**: The success of this change can be measured by assessing the ease of tracking work items and the reduction in merge conflicts.

* **Enhanced Pair Programming Sessions**:
  - **Why**: We decided to enhance our pair programming sessions to ensure smoother integration and implementation of features.
  - **Success Metric**: The success can be measured by the number of successful integrations and reduced merge conflicts.

* **Increased Focus on Service Provider Side Development**:
  - **Why**: We are making this change to ensure a balanced development effort between the user and service provider sides of the application. This will help us achieve a comprehensive and functional product.
  - **Success Metric**: The success can be measured by the completion rate of service provider side features and the overall stability of the application.

### Roles & Responsibilities

* **Zuhair**: Working on creating the feed/dashboard/home page for the service provider. This involves displaying posts relevant to the service provider's field (e.g., plumbing posts for plumbers).
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

Our primary goal for this iteration is to complete the user side of the app and develop the service provider side, ensuring all features are fully functional and well-integrated. Here are the detailed goals and tasks:

1. **Dashboard Implementation (User Side)**: 
   - **Tasks**: 
     - Implement quotes functionality.
     - Style the dashboard to ensure a user-friendly interface.
   - **User Stories**: 
     - As a user, I want to view all my quotes on the dashboard so that I can manage them efficiently.
     - As a user, I want the dashboard to have a clean and intuitive design so that I can easily navigate through it.

2. **Profile Completion (User Side)**:
   - **Tasks**: 
     - Enable users to edit personal information, including address.
     - Add rating and review features.
   - **User Stories**: 
     - As a user, I want to update my profile information so that my details are accurate.
     - As a user, I want to leave reviews and ratings for service providers.

3. **Service Provider Feed**:
   - **Tasks**: 
     - Create the feed/dashboard/home page for service providers.
   - **User Stories**: 
     - As a service provider, I want to see posts relevant to my services so that I can find potential jobs.

4. **Service Provider Profile**:
   - **Tasks**: 
     - Develop the profile page for service providers, including a verification section.
   - **User Stories**: 
     - As a service provider, I want to submit verification documents so that my profile is trusted.

5. **Service Provider Inbox**:
   - **Tasks**: 
     - Implement inbox functionality for service providers.
   - **User Stories**: 
     - As a service provider, I want to receive notifications about job requests and updates.

6. **Service Provider Current Jobs**:
   - **Tasks**: 
     - Develop the current jobs page for service providers.
   - **User Stories**: 
     - As a service provider, I want to monitor my ongoing jobs to ensure they are completed on time.

7. **Service Provider Quotes**:
   - **Tasks**: 
     - Implement the quote submission page for service providers.
   - **User Stories**: 
     - As a service provider, I want to send quotes to job requests so that I can offer my services.

### Artifacts

* **Mock-ups for User Interface (UI) Design**: Created using Figma for design mock-ups to visualize the UI flow. Canva is used for logo creation.
* **Database Schema**: Designed using Figma to create a visual representation of the database schema for Quotis. This diagram facilitated the preparation and correctness of the database design.
* **API Documentation**: Documented API endpoints for login, registration, posting jobs, and profile management to ensure clear communication between the frontend and backend teams. Tools like Postman were used to provide thorough documentation for the Quotis backend API.
* **Contribution Instructions**: Provided guidelines for setting up the development environment, choosing branch names, tracking issues, and using the pull request system. This facilitated an organized and cooperative contribution workflow.
* **Expo Emulator**: Used on the web to demonstrate our running app and ensure seamless integration of all features.
