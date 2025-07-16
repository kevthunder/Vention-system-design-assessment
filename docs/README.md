# YouTube Clone App

The goal of this project is to create a video-sharing and streaming platform, a YouTube "clone". 

## Components 

```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF
    Auth[Authentication Service]
    AuthDB[(User credentials)]
    BFF <--> Auth --- AuthDB
    User[User profiles service]
    UserDB[(User information, history, etc...)]
    BFF <--> User --- UserDB
    Encode[Video Processing/Transcoding Service]
    Storage[(Cloud Storage)]
    Storage -- stream ---> Frontend
    Encode -- new video --- VideoDB
    BFF <--> Channel -- upload --> Encode --> Storage
    Search[Search Service]
    VideoDB[(Video metadata)]
    BFF <--> Search
    Search ---- VideoDB
    Channel[Channel service]
    ChannelDB[(Channel information)]
    Channel -- "Title, description, etc..." --> VideoDB
    Channel --- ChannelDB
    Feed[Home feed & recommendation Service]
    BFF <--> Feed
    Feed ---- VideoDB
    Metric[Metrics service]
    BigData[("BigData")]
    BFF <--> Metric
    Metric -- Audiance targetting data ---> VideoDB
    Metric --- BigData
    FeedBack[FeedBack Service]
    FeedBackDB[("Likes, comments, etc...")]
    BFF <--> FeedBack --- FeedBackDB
```
![Components Diagram](./Components.png)

### Frontend and BFF (Backend For Frontend)
- React.js, next.js, typescript
- could use GraphQL for the BFF

Responsible for rendering the user interface, handling user interactions, and making API requests to the backends.

### Cloud Storage
- AWS S3 or Google Cloud Storage or Azure Storage

Stores the video files and thumbnails

### Video Processing/Transcoding Service
- Self-hosted (FFmpeg) or Cloud Video Processing Services (AWS Elemental MediaConvert, Google Cloud Video Intelligence API, Azure Media Services )

Converts uploaded videos into various formats and resolutions suitable for streaming across different devices

### micro service backends
while 20,000 and 50,000 Daily Active Users could be handled by one backend and one DB, Using multiple services will make the project more future proof and better structure the project

#### Authentication Service

usernames, passwords, Authentication Tokens
- nodejs
- server (express) or serverless (aws lambda) or 3rd party
- DB: relational(PostgreSQL)

#### User profiles service

personal info, favorites, personal likes, subscriptions, history
- nodejs
- server (express) or serverless (aws lambda)
- DB: relational(PostgreSQL)

#### Channel service

for people that upload videos, channels info, subscriber count
- nodejs
- server (express) or serverless (aws lambda)
- DB: relational(PostgreSQL)

#### Search Service

returns a video list given a search query, indexation, show meta data for current video
- nodejs
- server (express) or serverless (aws lambda)
- DB: relational(PostgreSQL) or indexing (elasticsearch) depending on the budget

#### Home feed & recommendation Service

Give a list of video to show on an user (or anonymous user) homepage or any other feeds
- nodejs
- server (express) or serverless (aws lambda)
- DB: relational(PostgreSQL)

#### FeedBack Service
Like and comments on videos. 
- nodejs
- server (express) or serverless (aws lambda)
- DB: Key value  (redis, dynamo db)

#### Metrics service
Collects data about everything. Could be used to find out which audience like which kind of videos
- 3rd party (datadog) or in house data engineering team's service


## User interactions and flows
### User Authentication
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    Auth[Authentication Service]
    AuthDB[(User credentials)]
    BFF <--> Auth --- AuthDB
```
### Trending and Recommended Videos
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    Feed[Home feed & recommendation Service]
    VideoDB[(Video metadata)]
    BFF <--> Feed
    Feed ---- VideoDB
```
### Video page
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    Search[Search Service]
    VideoDB[(Video metadata)]
    BFF -- current video metadata, stream url<--> Search
    Search ---- VideoDB

    Feed[Home feed & recommendation Service]
    BFF -- What to watch next <--> Feed
    Feed ---- VideoDB

    FeedBack[FeedBack Service]
    FeedBackDB[("Likes, comments, etc...")]
    BFF -- number of Likes, top comments <--> FeedBack --- FeedBackDB
```
### Video Playback and save progress in history

```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    Storage[(Cloud Storage)]
    Storage -- stream ---> Frontend

    User[User profiles service]
    UserDB[(User information, history, etc...)]
    BFF -- History <--> User --- UserDB
```
### Video Upload
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    VideoDB[(Video metadata)]
    Frontend <--> BFF

    Encode[Video Processing/Transcoding Service]
    Storage[(Cloud Storage)]
    Encode -- new video --- VideoDB
    BFF <--> Channel -- upload --> Encode --> Storage

    Channel[Channel service]
    ChannelDB[(Channel information)]
    Channel -- "Title, description, etc..." --> VideoDB
    Channel -- add video id to channel list--- ChannelDB
```

### Search
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    Search[Search Service]
    VideoDB[(Video metadata)]
    BFF <--> Search
    Search ---- VideoDB
```

### Video Interactions
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    FeedBack[FeedBack Service]
    FeedBackDB[("Likes, comments, etc...")]
    BFF -- "Likes, comments, etc..." <--> FeedBack --- FeedBackDB

    User[User profiles service]
    UserDB[(User information, history, etc...)]
    BFF -- Likes and comments history <--> User --- UserDB
```

### Channel Subscriptions
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend <--> BFF

    User[User profiles service]
    UserDB[(User information, history, etc...)]
    BFF <--> User -- Channel Id --- UserDB

    Channel[Channel service]
    ChannelDB[(Channel information)]
    BFF <--> Channel -- User Id --- ChannelDB
```

### Tracking user actions 
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend For Frontend]
    Frontend --> BFF
    
    Metric[Metrics service]
    BigData[("BigData")]
    BFF -- any user action --> Metric
    Metric --> BigData
```
### Use Tracked user actions to create audience targeting data

```mermaid
flowchart TD
    VideoDB[(Video metadata)]
    Metric[Metrics service]
    BigData[("BigData")]
    Metric -- Audiance targetting data ---> VideoDB
    Metric --- BigData
```