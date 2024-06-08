# QUOTIS

## What are you planning to build?

We plan to build Quotis, an innovative yet advanced mobile application designed to revolutionize the way clients connect to reliable handymen for plumbing, electrical work, and moving services. Quotis aims to provide a trustworthy and efficient platform where users can easily find qualified professionals, ensuring high-quality work through verified profiles and user reviews.

While within current market platforms like TaskRabbit and Handy do exist, they often fall short by charging high commission fees, featuring unverified workers, and delivering inconsistent quality of work. Quotis addresses these challenges by providing a commission-free environment and supportive network of handymen, thereby making the platform more attractive to both clients and handymen. Our app allows clients to post detailed job requests, receive multiple quotes from service providers, and select the best professional based on comprehensive reviews and ratings.

From a client's perspective, Quotis offers a seamless user experience by enabling users to post job requests with specific requirements and receive competitive quotes from nearby handymen. Clients can view detailed profiles, search for handymen themselves, check verifications, and even read reviews before making a decision. This transparency ensures that clients feel confident in the quality and reliability of the services they receive.

For handymen, Quotis provides a unique platform to build and generate client leads whilst enhancing their reputation through verified profiles and customer feedback. Handymen can respond to job requests, submit quotes, and showcase their expertise and past work. By eliminating commission fees and introducing dynamic pricing, Quotis ensures that service providers can retain their earnings, making the platform more attractive and fair for professionals seeking to grow their business.

Quotis will initially focus on three key service categories: electricians, plumbers, and movers. By specializing in these areas, we can ensure a high standard of service and create a strong foundation for future expansion into other types of handy work.

## Who are your target users? (2-3 personas)

Quotis caters to two primary target audiences: busy homeowners and professional handymen. By leveraging Quotis, homeowners can easily find reliable and verified handymen for essential maintenance tasks, ensuring peace of mind and high-quality service. This is particularly beneficial for professional handymen, who can use the platform to showcase their skills, gain new clients, and build a solid reputation without the burden of high commission fees. By connecting these two key demographics, Quotis enhances the overall efficiency and reliability of the home maintenance industry, benefiting both clients and service providers alike.

For detailed personas, refer to our [personas.pdf](personas.pdf).

## Why would your users choose your product? What are they using today to solve their problem/need?

By choosing Quotis for their handyman needs, users unlock a comprehensive and innovative solution that transforms the home maintenance experience. Our product provides a streamlined and efficient platform, saving users valuable time and effort by connecting them with verified and reliable professionals.

What sets Quotis apart from other platforms, such as TaskRabbit and Handy, is our commitment to a commission-free model and rigorous verification process for service providers. This ensures that clients can trust the quality and professionalism of the handymen they hire. Additionally, Quotis delivers an exceptional user experience with an intuitive interface, allowing users to easily post job requests, receive quotes, and select the best professional based on detailed profiles and user reviews.

Quotis also empowers service providers by offering a platform where they can showcase their skills, receive client feedback, and build their reputation without the burden of high commission fees. This not only attracts more qualified professionals to our platform but also ensures that clients have access to a pool of trustworthy and competent handymen.

For example, Joshua Lee, a landlord, can effortlessly find reliable professionals to maintain his rental property, eliminating the stress of dealing with unverified and unprofessional workers. Similarly, May Parker-Jameson, a single mother, can confidently hire verified handymen, knowing that her home and family are in safe hands.

Furthermore, Quotis enhances user satisfaction by offering features such as verified profiles, detailed user reviews, and a comprehensive search function. This personalized approach ensures that clients find the right professional for their specific needs, whether it's for plumbing, electrical work, or moving services.

With Quotis, both clients and service providers gain a reliable, efficient, and trustworthy platform, revolutionizing the way home maintenance and handyman services are managed.

## What does "DONE" mean to our team?

"Done" means that all necessary functionality and requirements of all user stories have been successfully implemented. From a comprehensive perspective, this implies that, at its core functionality, users should be able to create an account, post job requests, and receive quotes from service providers. Specifically, this means:

1. **User Account Management**: Users (both clients and service providers) can create and manage their accounts, ensuring a seamless onboarding process.
2. **Job Posting and Quotes**: Clients can easily post detailed job requests and receive multiple quotes from nearby service providers, facilitating informed decision-making.
3. **Service Provider Interaction**: Service providers can view job requests, submit quotes, and manage their job interactions efficiently.
4. **Search and Discovery**: Users can search for service providers based on various criteria such as ratings, reviews, and location, ensuring they find the best match for their needs.
5. **Verified Profiles**: The system clearly indicates verified profiles, providing clients with confidence in the qualifications and reliability of the service providers they hire.
6. **Job History and Reviews**: Both clients and service providers can view their job history and leave detailed reviews, fostering a transparent and trustworthy community.
7. **User Experience**: The app is user-friendly, secure, and performs well on both iOS and Android platforms, ensuring a smooth and reliable experience for all users.

In essence, "done" means that Quotis provides a fully functional, intuitive, and secure platform that meets the needs of both clients and service providers, effectively bridging the gap between those in need of reliable home maintenance services and professionals seeking job opportunities.

## Highlights

During the product creation phase, our team held multiple in-person meetings to brainstorm and refine our ideas. To facilitate coordination, we scheduled dedicated team meetings from 4-5pm before our lecture on Tuesdays. In the initial phase, we conducted research both online and through in-person discussions to explore various features and functionalities that would make our app stand out. We used GitHub as our primary platform for sharing and discussing code or potential API’s to use in our project, and Google Docs for tracking meeting notes and collaborative documentation. We used a Discord group chat for ongoing informal discussions, and Slack to issue our online stand-up meetings through Zoom. Additionally, we used Jira to manage any sprint tasks and deadlines, as well as assigning any work to designated members on the team. This collaborative approach helped us make informed decisions and stay on track with our project timeline. Our structured and communicative workflow ensured that we could address challenges promptly and refine our product effectively. Some of our key insights and decisions that came up during our meetings are listed below:

1. **Payment Feature Exclusion**:
   - **Decision**: We decided not to include a payment feature in the app.
   - **Alternatives Considered**: Implementing an in-app payment system.
   - **Rationale**: Due to legal complexities and implementation challenges, we chose to leave the payment process to the client and handyman to handle offline. This decision helps us avoid potential disputes over payment completion and allows us to focus on developing a robust connection platform first. Additionally, holding the payment on the app until the job has been completed, deciding which 3rd party payment to use, and ensuring payment security, all provided unnecessary implementation challenges beyond the core functionality of the app given our timeline.

2. **0% Commission Model**:
   - **Decision**: Our platform will operate on a 0% commission model.
   - **Alternatives Considered**: Charging a commission fee on transactions.
   - **Rationale**: A commission-free model attracts more users and handymen. It also provides a strong marketing advantage over existing platforms that charge high fees. We plan to monetize through ads and partnerships in the future. Secondly, users and handymen can always avoid the commission fee by deciding to communicate and even negotiate payment methods and details by taking communication outside/off the app.

3. **Messaging Feature Exclusion**:
   - **Decision**: We decided not to include an in-app messaging feature.
   - **Alternatives Considered**: Implementing an in-app messaging system.
   - **Rationale**: Given our current feature set and timeline, implementing a messaging feature was deemed too complex. Instead, users are encouraged to communicate off the app using contact details provided in quotes or profiles, until we decide to introduce this feature perhaps sometime outside the timeline of the project.

4. **Services Page Addition**:
   - **Decision**: We added a services page to allow users to search for specific handymen.
   - **Alternatives Considered**: Only allowing users to post job requests.
   - **Rationale**: Adding a services page enhances user satisfaction by providing more control and options. It also sets our app apart from competitors by offering a dual approach to finding service providers.

5. **Open Verification**:
   - **Decision**: Initially, we planned to only have verified professionals on the app.
   - **Alternatives Considered**: Limiting the platform to verified professionals.
   - **Rationale**: Allowing both verified and unverified handymen on the app helps to garner more traffic and provides users with a wider range of options. Users can see, rate, and review all workers, with verified professionals clearly indicated.





