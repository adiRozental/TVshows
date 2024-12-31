### Thought Process and Design Decisions for the TV Shows Project

#### **Server-Side Implementation**

**Minimal Data Transfer**  
From the beginning, I aimed to make the API efficient by reducing the amount of data sent to the client. The TVMaze API provides extensive information about each show, much of which is not immediately relevant to our application. To address this, I created two distinct models:

1. **TVShow Model**: Represents the complete structure of the data fetched from the TVMaze API.
2. **ShowDto Model**: A simplified version of the TVShow model, containing only the fields necessary for the client, such as:
   - `Id`
   - `Name`
   - `Genres`
   - `Image`
   - `Premiered`
   - `Language`
   - `Rating`
   - `Summary`

By mapping the API response to the `ShowDto` model, I ensured that only the required data is transferred, minimizing payload size and improving performance.

---

**Design Improvements for Better Code Organization**  
If I had more time, I would have implemented the **Repository Pattern** to further separate concerns. Currently, the controller contains both the logic for fetching data and mapping it to DTOs. While this works for a small project, splitting these responsibilities would:

1. Make the code cleaner and more modular.
2. Improve maintainability.
3. Allow easier testing of individual components.

The repository layer would handle all interactions with the external TVMaze API, leaving the controller to focus solely on routing and returning responses.

---

**Episode Data**  
To fetch episode data for a specific show, I implemented the `GetEpisodes` endpoint. This endpoint directly retrieves episodes using the show ID, sending the raw data back to the client. If needed, a similar optimization with DTOs could be applied here in the future to minimize payload size.

---

#### **Front-End Implementation**

**Component Structure**  
Initially, I created two components:

1. **Shows Component**: Responsible for displaying the list of TV shows.
2. **ShowData Component**: Handles the display of detailed information about a specific show.

However, as the project evolved, I decided to introduce a **Main Page Component** to act as the central hub. The main page redirects to the appropriate component based on user interactions. This decision was driven by:

1. **Clarity**: The main page serves as a clear entry point for the application.
2. **Modularity**: Centralizing the routing logic made it easier to manage the application’s structure.
3. **Shared Features**: Features like the theme toggle (dark mode/light mode) could be comfortably shared across components via the main page.

---

**Styling and User Experience**  
For the front-end, I prioritized creating a visually appealing and user-friendly interface. The theme toggle was a particularly important feature for improving user experience, as it allows users to switch between light and dark modes effortlessly. Organizing the components under the main page also ensured consistency across the application.

Designing the Filtering Section:
I wanted the filtering section to be straightforward but also flexible enough for diverse user needs. My goal was to let users search for movies, filter them by genres, rating, and language, all without overwhelming them with options. Initially, I displayed all the genres as checkboxes, but it quickly became visually cluttered.

To solve this, I decided to hide the genres inside a dropdown that appears only when hovering over the "Genres" label. This design choice made the UI cleaner and focused while keeping the filtering options accessible. I added a slight overlap between the label and dropdown to eliminate any gap, ensuring smooth interaction.
