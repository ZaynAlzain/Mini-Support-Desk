
# **Workflow**


* Set up the Flask backend and React frontend structure manually.

* Used AI mainly to clarify architecture, debug behavior, and improve UI/UX.

* Implemented backend logic first, then validated and refined it through AI questions.

* Built the frontend and refined it based on real UI issues I encountered.

* Seeded the database early to test realistic data scenarios.

* Implemented filtering and sorting.

* Movedlogic from frontend to backend once complexity increased.

* Refactored frontend logic into reusable custom hooks.

* Performed several UI polish passes (tables, filters, forms).

* Improved UX flows (delete confirmation, instant UI updates).

## 

#### **Setup / Scaffolding**



Prompt :



I want to start a small full-stack project using Flask for the backend and React for the frontend what is a clean and maintainable project structure for this type of application



What I changed after:



* Adapted the suggested structure to match course constraints and grading expectations.

* Removed unnecessary files and kept only essential folders.

* Wired Flask and React manually instead of relying on generators.



#### **Backend API**

Prompt



I was given a predefined REST API contract for a ticket system help me implement this API in Flask using SQLAlchemy strictly following the provided endpoints and query parameters


What I changed after:



* Implemented filtering, sorting, and pagination as specified.

* Kept responses minimal and aligned with frontend needs.





Prompt



How can I implement server side filtering and sorting in Flask using SQLAlchemy based on request query parameters



What I changed after:



* Ensured filtering happens before sorting and pagination.

* Whitelisted valid sort fields to prevent invalid queries.

* Added sensible defaults so the API always returns predictable results.





Prompt



What is the correct way to implement pagination when filtering and sorting are also applied without breaking page consistency



What I changed after:



* Applied pagination last to avoid inconsistent results.

* Returned total item count so the frontend could calculate pages.

* Reset page index when filters or search parameters change.



#### Database / Migrations

Prompt



What is a clean way to design SQLAlchemy models for tickets and comments including created and updated timestamps



What I changed after:



* Controlled updated\_at manually to avoid unintended updates.

* Ensured timestamps are generated server-side, not from the client.





Prompt



How can I seed the database with realistic example tickets and comments for development and testing



What I changed after:



* Increased seed size later to properly test pagination.

* Adjusted timestamps to realistically simulate overdue tickets.





#### Frontend UI

Prompt



The ticket list UI feels cluttered how can I redesign it into a clean, professional table layout



What I changed after:



* Centered status, priority, and date columns for readability.

* Reduced visual noise by tightening spacing and badge sizes.



Prompt



How can I improve the filter bar layout so it looks cleaner more balanced and easier to use



What I changed after:



* Grouped related controls (search + filters) visually.

* Reduced input heights so everything aligns cleanly.




Prompt



The delete confirmation currently uses a browser alert how can I replace it with a custom modal for a better user experience



What I changed after:



* Kept delete logic intact while improving UX.

* Ensured the UI updates instantly without a full refresh.





#### Debugging



Prompt



Pagination breaks when the last item on a page is deleted how should this edge case be handled correctly



What I changed after:



* Adjusted page number after deletion when needed.

* Refetched data without resetting filters or sorting.

* Prevented empty pages from appearing.



Prompt : 



The search input loses focus after a component rerender how can I preserve input focus when the UI updates



What I changed after:

* Implemented a small autofocus hook using useRef.

* Limited focus triggers to specific state changes.
  
