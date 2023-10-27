# FootyMatchup (Final Project)

## Elevator Pitch

Soccer is the world's most popular sport, but many people in America do not have a team they follow. FootyMatchup takes your other favorite sports teams and gives you a soccer team with similar style and history that you can start to follow!


## User Stories

1. As a non-soccer fan, I want to enter in one of my other favorite sports teams, so that I can receive a recommendation for a soccer team to start following.

2. As an admin, I want the ability to manage users so that passwords can be recovered.

3. As a soccer fan, I want the ability to log in and favorite teams so I can follow scores and schedules.

4. As a user, I want the ability to search for any professional soccer team in the world and find their statistics, scores, and schedule so that I can stay up to date.

5. As a soccer fan, I want to be able to see live scores on the homepage so that I can tune into the game if it is interesting.

6. As a user, I want to have the option to not log-in so that I can still use most of the application features.

7. As a user, I would like to click on other teams in the league table within a team so that I can easily navigate to their page.

8. As a logged-in user I would like to be able to click a button so that I can add upcoming fixtures to my calendar.

## Requirements

- Backend
  - Build a project with both user authentication and authorization
  - Use data stored in a persistent database (an RDBMS like Postgres or MySQL is preferred)
  - Build a RESTful API.
  - Include at least one image or file upload
- Frontend
  - Build a responsive UI that works across various screen sizes.
  - Implement CRUD functionality

## Tech Stack

- PostgreSQL - DataBase
- Django + Django REST Framework + SimpleJWT - Backend
- React - Frontend
- API - API football, openAI API

## Workflow

### Frontend

- User has 2 options from home page

  - Option 1: Direct Search
    - User has 2 search inputs: "Team Name" or "Country" (must choose one)
    - Search for "Team Name" returns exact team's page (see UI below)
    - Search for "Country" displays links for all leagues in that country in order of their level
      - Clicking on the League brings up a list of links for all teams in that league (Name and Logo) and the current league table
      - Clicking on one of the teams will take the user to that team's page (same as "Team Name" Search)
  - Option 2: Find New Team to Follow
    - User will be instructed to list one or more of their favorite teams from other sports in a search box.
    - Clicking a button will trigger openAI API to run the prompt to find their new team and why.
    - Users will be directed to that new team's page
      - Users will see the text reply from the openAI API on why that team was selected in a modal

- Users will have the option to create an account/log-in
  - This allows users to favorite teams and add upcoming fixture schedules to their calendar

#### UI

- Navigation Bar on top of every page with "Home", "Favorites" "Log-in/Create Account" Buttons
  -Home Page
  - 5-6 live scores of games that are currently occurring on top of home page
  - Search area with 1 input to find new team
  - Search area with 1 input to search for team
- Individual Team page
  - Logo, Team Name, Upcoming fixtures, place in domestic league table, Rosters, Top scorers
  - Clickable links to find out more about a certain player (Takes to Player Page)
  - Favorite Button
  - Add to calendar button for upcoming fixtures
- Player page
  - Shows stats of players (TBD on what/design)
- Favorites
  - Dropdown menu from Nav Bar with all favorite teams listed
- Country Page
  - List of all professional leagues in that country
  - Ordered with top league first
  - Clickable links to get to League Page
- League Page
  - Current league table with team names and logos
  - Clickable links to get to Individual Team Page

### Backend

- Username and password sent to app API (if signed in)
  - Pulls favorite teams
- Data is pulled from API Football to load "Country", "League", "Team", "Player" Pages when searched or new team is found
- Data is pulled from OpenAI API based on what team(s) the user enters
  - Team is selected and then that team is called for via API Football

## Data Models

### Tables

- Users

  - ID
  - Username
  - Password
  - Token
  - Favorites

- API Football (structure)
  - Countries
    - Leagues
      - Standings
      - Fixtures
        - Live
      - Teams
        - Coaches
        - Team Statistics
        - Players
          - Player Stats
          - Player Transfers

### Relationship

Found Team (From OpenAi) (one)-> New Team (From API Football) (one)
