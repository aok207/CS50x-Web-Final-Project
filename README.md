# URL Shortener

## Check out the demo [here](https://youtu.be/I9jqMemPW2g).

## Distinctiveness and Complexity

### Project Selection
After a day of contemplation, I settled on developing a URL shortener as my final project. I wanted something unique and challenging, different from what we've done before. The idea intrigued me, as it involves a service whose functionality I hadn't explored before.

### Enhancements
Recognizing that a simple URL shortening service might not be complex enough, I decided to incorporate additional features. I expanded the project to include analytics, user authentication, and the ability to customize aliases. Initially considering a public API, I opted for a more focused approach, developing APIs for internal use in the frontend due to time constraints and the decision not to deploy the service publicly. I used the API in editing and deleting links, allowing for real-time updates without the need to refresh the entire page.

### Project Features
- **URL Shortening Service:** The core functionality provides users with shortened URLs.
- **Analytics:** Comprehensive analytics include click counts, click trends over the last seven days, click counts by devices, and click counts by location (using the IPStack API to determine user locations).
- **Search Functionality:** Users can search through their list of shortened URLs for easy access.
- **Custom Alias/Back Half:** Users can personalize their short URLs by adding custom aliases or back halves.
- **Edit Links:** The ability to modify existing URLs to update details.
- **User Authentication:** Secure user authentication ensures a personalized experience.

## File Structure

- **`final_project/`**: Django project directory.
  - **`url_shortener/`**: Django app directory.
    - **`static/`**: Contains static files like css, javascript and images.
    - **`templates/`**: HTML templates.
      - **`layout.html`**: Contains the general layout of the website, like sidebar and navbars
      - **`index.html`**: Define the home page user will see, if he or she is not logged in.
      - **`login.html`**: Log in page.
      - **`register.html`**: Sign Up page.
      - **`dashboard.html`**: Home page user will see, if he or she is logged in.
      - **`dashboard_links.html`**: Shows every links, user has created.
      - **`dashboard_analytics.html`**: Overall analytics page.
      - **`dashboard_profile.html`**: User can change the password and the username in this page.
      - **`create.html`**: This is the page where user can create their links.
      - **`link.html`**: HTML for individual links.
      - **`not_found.html`**: This page is shown when someone tries to access a shortened url that doesn't exist.
    - **`models.py`**: Defines URL and IPRecord models and the function to create a unique shortened back half.
    - **`views.py`**: Handles views and logic including the API-related views.
    - **`urls.py`**: Manages URL patterns.
    - **`serializers.py`**: Serializes data for API responses.
- **`requirements.txt`**: Lists necessary Python packages.
- **`manage.py`**: Django command-line utility.
- **`db.sqlite3`**: SQLite database file.

## How to Run

1. Clone the repository: `git clone https://github.com/aok207/CS50-web-final-project.git`
2. Navigate to the project directory: `cd url_shortener`
3. Install required packages: `pip install -r requirements.txt`
4. Create .env file in the project root.
5. Get an API key from from IPStack(It's free.), and add it to .env file like this: `API_KEY = YOUR_API_KEY`
6. 4. Apply database migrations: `python manage.py migrate`
7. Run the development server: `python manage.py runserver`
8. Open your browser and visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Additional Information

- Ensure you have Python and pip installed.
- The application is designed to be mobile-responsive for a seamless user experience across devices.
- While the project may not be deployed publicly, it demonstrates the capabilities of a feature-rich URL shortening service with analytics and user authentication.

## Conclusion

In conclusion, the URL shortener project goes beyond a basic URL shortening service, offering a distinctive and complex web application that fulfills the course requirements. The README provides comprehensive documentation, outlining project choices, features, and installation steps. This project showcases the fusion of Django on the back-end and JavaScript on the front-end, resulting in a modern and responsive web application.
