# Quotis Team

## Iteration 2 - Review & Retrospect

* When: Friday, July 5th, 2024
* Where: Online on Slack

## Process - Reflection

### Decisions that turned out well

1. **Collaborative Work on User Stories**:
   - Working together on user stories that required both service provider and client information allowed us to plan future service provider features more effectively. This collaboration ensures a more streamlined implementation in future sprints.

2. **Prioritizing Critical Tasks**:
   - Focusing on important tasks such as resolving bugs and merge conflicts first helped maintain project momentum. By ensuring that essential features were completed early, we prevented delays in other areas of the project.

3. **Sub Categorizing Tasks**:
   - Sub-categorizing tasks was a beneficial decision for efficient organization and clarity. This approach enabled better progress tracking and resource allocation within the project, improving our overall workflow.

### Decisions that did not turn out as well as we hoped

1. **Not Considering Dependencies in Merge Requests**:
   - We encountered issues because we did not account for dependencies when pushing changes. This oversight caused difficulties when trying to merge changes, suggesting that removing dependencies from merge/pull requests might have been a better strategy.

2. **Lack of Clear Code Comments**:
   - Insufficient commenting in our codebase made it harder for team members to understand and maintain the code. This led to potential issues and delays in our development process.

### Planned changes

1. **Implementing Clear Code Comments**:
   - To improve code readability and maintainability, we will emphasize adding clear comments throughout our codebase. This change will promote better documentation and knowledge sharing among team members.

2. **Breaking Down Tasks into Smaller Units**:
   - We plan to split larger tasks into smaller, manageable units. This approach will improve progress tracking, resource allocation, and collaboration efficiency, enhancing our overall project management.

## Product - Review

### Goals and/or tasks that were met/completed

1. **Services Page Implementation**:
   - We implemented the Services page, allowing users to select different types of services such as Plumbing, Contractor, and Electrician (see attached screenshots). This feature is critical for connecting clients with service providers.

2. **Service Provider Information Display**:
   - The ServiceSearch page now displays detailed information about service providers, including their expertise and contact information. This functionality enhances user experience by providing easy access to relevant details.

3. **User Dashboard Enhancements**:
   - On the User Dashboard, users can now accept or decline quotes. The quotes change color based on their status, and accepted or declined quotes show up in the notification inbox. This improvement provides better clarity and user interaction.

4. **Notification System**:
   - We created a notification array within the user database schema. Notifications are generated and displayed in the user's inbox, enhancing communication and updates within the application.

5. **User Password Encryption**:
   - We have implemented encryption for user passwords, enhancing the security and integrity of user data.

6. **Profile Page Implementation**:
   - The profile page has been properly completed, although it is not yet integrated. This feature will allow users to manage their personal information effectively.

### Goals and/or tasks that were planned but not met/completed

1. **Edit User Profile Feature**:
   - We planned to implement the Edit User Profile feature, but changes to the user database schema, such as adding first name and last name fields and encrypting passwords, complicated the merge process. This feature is still in progress.

2. **Querying and Filtering Service Providers**:
   - While we intended to implement querying and filtering for service providers on the Services page, we have only managed to split them into different sections accessed via buttons. Further refinement of this feature is needed.

## Meeting Highlights

1. **Improved Collaboration**:
   - Collaborative work on intertwined user stories has proven beneficial, indicating that future sprints should continue this approach to ensure cohesive feature development.

2. **Enhanced Task Prioritization**:
   - Prioritizing critical tasks such as bug fixes and conflict resolution early in the sprint has helped maintain project momentum, suggesting this should be a continued practice.

3. **Code Readability**:
   - Emphasizing code comments and breaking down tasks into smaller units are crucial changes for the next iteration. These adjustments will improve collaboration and efficiency.

4. **Feature Completeness**:
   - Ensuring that features are thoroughly planned and dependencies are accounted for will prevent future merge conflicts and streamline the development process.
