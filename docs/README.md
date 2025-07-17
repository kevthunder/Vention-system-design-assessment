# YouTube Clone App

The goal of this project is to create a video-sharing and streaming platform, a YouTube "clone".

# Components

```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF
    Auth[Authentication Service]
    AuthDb[(User Credentials)]
    BFF <--> Auth --- AuthDb
    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF <--> User --- UserDb
    Encode[Video Processing/Transcoding Service]
    Storage[(Cloud Storage)]
    Storage -- stream ---> Frontend
    Encode -- new video --- VideoDb
    BFF <--> Channel -- upload --> Encode --> Storage
    Search[Search Service]
    VideoDb[(Video Metadata)]
    BFF <--> Search
    Search ---- VideoDb
    Channel[Channel Service]
    ChannelDb[(Channel Information)]
    Channel -- "Title, Description, etc..." --> VideoDb
    Channel --- ChannelDb
    Feed[Home Feed & Recommendation Service]
    BFF <--> Feed
    Feed ---- VideoDb
    Metrics[Metrics Service]
    BigData[Big Data]
    BFF <--> Metrics
    Metrics -- Audience Targeting Data ---> VideoDb
    Metrics --- BigData
    Feedback[Feedback Service]
    FeedbackDb[(Likes, Comments, etc...)]
    BFF <--> Feedback --- FeedbackDb
```
![Components Diagram](./Components.png)


## Frontend and BFF (Backend for Frontend)
- React.js, Next.js, TypeScript
- Could use GraphQL for the BFF

Responsible for rendering the user interface, handling user interactions, and making API requests to the backends.


## Cloud Storage
- AWS S3, Google Cloud Storage or Azure Storage

Stores the video files and thumbnails


## Video Processing/Transcoding Service
- Self-hosted (FFmpeg) or Cloud Video Processing Services (AWS Elemental MediaConvert, Google Cloud Video Intelligence API, Azure Media Services)

Converts uploaded videos into various formats and resolutions suitable for streaming across different devices



## Microservice Backends
While 20,000 to 50,000 Daily Active Users could be handled by one backend and one database, using multiple services will make the project more future-proof and better structure the project.

### Authentication Service
Handles usernames, passwords, authentication tokens.
- Node.js
- Server (Express) or serverless (AWS Lambda) or 3rd party
- DB: Relational (PostgreSQL)

#### Example API Endpoints
- `POST /api/auth/login` — Authenticate user and return token
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/logout` — Invalidate user session

### User Profiles Service
Manages personal info, favorites, likes, subscriptions, history.
- Node.js
- Server (Express) or serverless (AWS Lambda)
- DB: Relational (PostgreSQL)

#### Example API Endpoints
- `GET /api/users/:id` — Get user profile
- `PUT /api/users/:id` — Update user profile
- `GET /api/users/:id/history` — Get user watch history
- `POST /api/users/:id/history/video/:id` — Save progression on a video
- `GET /api/users/:id/favorites` — Get user favorite videos
- `POST /api/users/:id/favorites` — Add a video to the user favorites
- `GET /api/users/:id/subscriptions` — Get user subscribed chanel
- `POST /api/users/:id/subscriptions` — Add a channel to the user subscriptions

### Channel Service
For users who upload videos, manages channel info and subscriber count.
- Node.js
- Server (Express) or serverless (AWS Lambda)
- DB: Relational (PostgreSQL)

#### Example API Endpoints
- `GET /api/channels/:id` — Get channel info
- `GET /api/channels/:id/videos` — List videos for a channel
- `POST /api/channels/:id/videos` — upload a new video to a channel
- `GET /api/channels/:id/subscribers` — List subscribers to a channel

### Search Service
Returns a video list given a search query, handles indexing, shows metadata for current video.
- Node.js
- Server (Express) or serverless (AWS Lambda)
- DB: Relational (PostgreSQL) or indexing (Elasticsearch) depending on the budget

#### Example API Endpoints
- `GET /api/search?q=keyword` — Search for videos by keyword or any query

### Home Feed & Recommendation Service
Provides a list of videos to show on a user's (or anonymous user's) homepage or other feeds.
- Node.js
- Server (Express) or serverless (AWS Lambda)
- DB: Relational (PostgreSQL)

#### Example API Endpoints
- `GET /api/feed` — Get recommended videos for homepage
- `GET /api/feed/trending` — Get trending videos
- `GET /api/feed/videos/:id` — Get the "watch next" feed on a video

### Feedback Service
Handles likes and comments on videos.
- Node.js
- Server (Express) or serverless (AWS Lambda)
- DB: Key-value (Redis, DynamoDB)

#### Example API Endpoints
- `POST /api/likes/videos/:id` — Like a video
- `Get /api/likes/videos/:id` — Get the number of Likes on a video
- `POST /api/comments/videos/:id` — Add a comment to a video
- `GET /api/comments/videos/:id` — Get comments for a video

### Metrics Service
Collects data about everything. Can be used to find out which audience likes which kind of videos.
- 3rd party (Datadog) or in-house data engineering team's service

#### Example API Endpoints
- `POST /api/metrics/event` — Track a user event (view, like, etc.)
- `GET /api/metrics/video/:id` — Get metrics for a video

# User Interactions and Flows
## User Authentication
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    Auth[Authentication Service]
    AuthDb[(User Credentials)]
    BFF <--> Auth --- AuthDb
```
## Getting Trending and Recommended Videos
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF -- Get user's audience type, subscriptions  <--> User --- UserDb

    Feed[Home Feed & Recommendation Service]
    VideoDb[(Video Metadata)]
    BFF <--> Feed
    Feed ---- VideoDb
```

## User is Seeing a Video Page
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    Search[Search Service]
    VideoDb[(Video Metadata)]
    BFF -- current video metadata, stream url<--> Search
    Search ---- VideoDb

    Feed[Home Feed & Recommendation Service]
    BFF -- What to watch next <--> Feed
    Feed ---- VideoDb

    Feedback[Feedback Service]
    FeedbackDb[(Likes, Comments, etc...)]
    BFF -- number of Likes, top comments <--> Feedback --- FeedbackDb
```
## Video Playback and Save Progress in History
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    Storage[(Cloud Storage)]
    Storage -- stream ---> Frontend

    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF -- History <--> User --- UserDb
```
## Video Upload
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    VideoDb[(Video Metadata)]
    Frontend <--> BFF

    Encode[Video Processing/Transcoding Service]
    Storage[(Cloud Storage)]
    Encode -- new video --- VideoDb
    BFF <--> Channel -- upload --> Encode --> Storage

    Channel[Channel Service]
    ChannelDb[(Channel Information)]
    Channel -- "Title, Description, etc..." --> VideoDb
    Channel -- add video id to channel list--- ChannelDb
```

## Retrieve History
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF -- Get history videos ids <--> User --- UserDb

    Search[Search Service]
    VideoDb[(Video Metadata)]
    BFF -- get videos by ids <--> Search
    Search --- VideoDb
```

## Search
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    Search[Search Service]
    VideoDb[(Video Metadata)]
    BFF <--> Search
    Search ---- VideoDb
```

## Video Interactions
ex: User like a video, User comment on a video
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    Feedback[Feedback Service]
    FeedbackDb[(Likes, Comments, etc...)]
    BFF -- "Likes, comments, etc..." <--> Feedback --- FeedbackDb

    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF -- Likes and comments history <--> User --- UserDb
```

## User subscribe to a Channel
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend <--> BFF

    User[User Profiles Service]
    UserDb[(User Information, History, etc...)]
    BFF <--> User -- Channel Id --- UserDb

    Channel[Channel Service]
    ChannelDb[(Channel Information)]
    BFF <--> Channel -- User Id --- ChannelDb
```

## Tracking User Actions
```mermaid
flowchart TD
    Frontend[Frontend]
    BFF[Backend for Frontend]
    Frontend --> BFF

    Metrics[Metrics Service]
    BigData[Big Data]
    BFF -- any user action --> Metrics
    Metrics --> BigData
```
## Use Tracked User Actions to Create Audience Targeting Data
```mermaid
flowchart TD
    VideoDb[(Video Metadata)]
    Metrics[Metrics Service]
    BigData[Big Data]
    Metrics -- Audience Targeting Data ---> VideoDb
    Metrics --- BigData
```