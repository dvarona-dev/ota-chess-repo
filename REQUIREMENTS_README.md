# Amenitiz Front-end Technical Challange 🚀

## Introduction

The task is to create a wiki of Chess Grandmasters as defined by Chess.com. We are open to different layouts and styles.

### What we are looking for:
- This exercise should be done in React with Typescript. 
- We do not expect production-ready code. However, we do expect the candidate to point out sub-optimal compromises taken to complete the task

📖 Documentation for chess.com's API can be found here: https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive

## ♟️ Step 1: List the Grandmasters

Using the chess.com API, create a page that lists all the Grandmasters.

API endpoint: https://api.chess.com/pub/titled/GM

## ♟️ Step 2: Grandmaster profile page

Extend the page that you created for the previous step so that if you click on a listed grandmaster, it should take you to a profile page displaying the information from the player endpoint.

API endpoint for player: [https://api.chess.com/pub/player/{username}](https://api.chess.com/pub/player/john)

## ♟️ Step 3: Add Grandmaster summary

On the profile page for a grandmaster that you created in step 2, add a clock that displays the amount of time since they were last online. The time since the user was active should be displayed as HH:MM:SS, and it should update every second.
