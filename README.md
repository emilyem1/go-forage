# Go Forage - Your Gateway to Mushroom Foraging!

Discover, document, and share your mushroom foraging adventures effortlessly with Go Forage! 
Explore a catalog of edible mushrooms, pin your findings on an interactive map, and craft detailed field journals. 
Join a vibrant community of foragers, where you can easily explore others' discoveries, and dive into a captivating world of fungi exploration—all at your fingertips!
Powered by React, Express, Node, Postgres, and Material UI, Go Forage offers a robust platform for your mushroom hunting endeavors.

## Features

Go Forage is a comprehensive app designed to demystify mushroom foraging and foster a thriving community of enthusiasts.

- Explore an interactive map that displays the location of a users forage
- Create and manage blog posts about your mushroom findings
- Search for a specific mushroom/blog/user
- Bookmark other users blogs
- Follow other users to see their blogs in a filtered feed 
- Explore a catalogue of mushrooms found in the British Columbia area.
- Accumulate mushroom badges to proudly display your foraging achievements to fellow users

## Screenshots

#### Main Feed

!["Screenshot of home feed"](<public/images/Home-Feed.png>)

#### Map

!["Screenshot of public map"](<public/images/Public-Map.png>)

#### Mushroom Encyclopedia

!["Screenshot of mushroom page"](<public/images/Mushroom-Page.png>)

!["Screenshot of expanded mushroom details"](<public/images/Mushroom-Card-Expanded.png>)

#### Field Journal

!["Screenshot of field journal"](<public/images/Field-Journal.png>)

!["Screenshot of edit feature"](<public/images/Edit.png>)

#### User Account

!["Screenshot of user account"](<public/images/Account.png>)

#### Search

!["Screenshot of search feature"](<public/images/Search.png>)

## Getting Started

1. Create `.env.development` in the backend by using `.env.example` as a reference.

2. Create an `.env.local` in the frontend, that contains your google maps api key:
`REACT_APP_GOOGLE_MAPS_API_KEY="api_key_here"`

3. Install dependencies in the frontend and backend: `npm install`
4. Start servers: `npm start`
5. Reset database: `http://localhost:8001/api/debug/reset`
6. Visit `http://localhost:3000/`