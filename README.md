# jackbox-knockoff
full stack hack-a-thon (48-72 hr)


# Idea
We're going to create a knockoff of "Jack box party" or w/e its called. 

Its basically a websocket game where a user can generate a room with a unique code, and up to 8 other users can join that room.

Each room hosts a game of some sort, and users interact by clicking a button of some sort that show up on their screens.  

Each user's inputs and choices are recorded then scored.

Each user's views should change simultaneously as they should be in sync.

After x-number of rounds, the game ends with the leaderboard showing the winner.

After the game is over, users can choose to restart the game or close the room

### Room Life Cycle
 - Room is created when player requests to create a new room
 - Game begins and ends
 - if users choose to continue playing, room will persist; else room is destroyed

### Game Life Cycle
 - Room must exist, and users must be within a lobby
 - Game begins when initial user launches from lobby
 - Game automatically ends when it is completed
 
## Views
#### Main Screen
 - two input fields, username and room code
   - Username is required to progress
   - room code is optional, but is required if user clicks JOIN a room
#### Lobby
 - Creates the Room (or socket session)
 - Shows all connected users
 - Only the first user can see the 'launch' button for the game
 - If first user leaves, the room is closed
#### Game Screen
 - Follows the format of 
   1. "Request Text input from user"
   2. "Request choice selection from user"
   3. "Display results and score for each user"
   4. "Repeat Steps 1-3 until X number of rounds have completed"

#### Running App
 - Downoad the app
 - npm install
 - npm start
