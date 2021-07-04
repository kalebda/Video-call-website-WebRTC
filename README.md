# Bit-Meet

WebRTC based video chat app developed at Bahir Dar Institute of Technology.
This is the initial version once its updated with more features it will be come
full featured web app to server at the University.

# [Demo](https://sharp-darwin-f5e646.netlify.app/)

Click the demo link above to check it out

# Uses

-   **`React`** the best frontend client.
-   **`Socketio`** for signalling and room management. we don't use `REST` and `Express` at all in this.
-   **`Fluentui`** for good-looking UI components without writing much CSS.
-   **`Recoil`** for local state management.

All connection data like video, audio and messages are transferred peer to peer without going through server.

# Goal

To build Open source peer-to-peer video conferencing app, easily deployable and extendable for custom use cases. So this can be extended for any extra custom features like, file sharing, session recording, options for Media server based solution and/or encryption, etc.

# Limitations

It scales very well in terms of how many rooms can be on server as it is a peer to peer solution, infact a peer doesn't even need to be connected to server once connection is established with other peer. However there is a huge natural limitation on how many participants can be in one single room due to bandwidth and processing requirements. Peer-to-peer playes negative role on that front as every peer is sending and recieving data with every peer in a room. This limitation is little overcomed with adaptive bandwidth usage and other optimizations, but core limitation is by design.

# Why node-cache instead of database?

Works for now since this is beta version

TODO migrate to mongo db soon.

# Deploying

This app is currently deployed on netlify

## Prebuilt images with docker-compose

Run the provided `docker-compose` file in _appropriate place_

`docker-compose up`

And done, just serve behind ssl, expose port 5000 for sockets and enjoy your life. If you want to deploy modified app, see options below.

TODO proxy websockets with nginx without having to open port.

## Docker

This project is split into two containers, one for react front-end which is build and then served with nginx and other for server.

### Build images

Following commands builds these images respectively.

_cd %project-root%_

`docker build --build-arg SOCKET_PORT=5000 --tag bit-meet .`

`docker build --tag bit-meet-backend ./server`

### Run containers

`docker run -d --rm -p 80:80 --name client bit-meet`

`docker run -d --rm -p 5000:5000 -e "PORT=5000" --name server bit-meet-backend`

_If you are gonna have server and client on different domains, pass `ALLOW_ORIGIN` env variable to server and `REACT_APP_SOCKET_URL` to client._

## Manual

If you dont wan't to use docker, these are the npm commands for every step.

[cd <project-root>]

`npm install` to to install react dependencies.

`npm run dev` to start development webpack server.

`npm run build` to format, lint and build front-end.

_Then_ serve static files accordingly

[cd server]

`npm install` installs Server dependencies.

`npm run dev` to start development server with nodemon (install globally).

`npm run build` transpiles Typescript server file to JavaScript.

`npm run start` starts the Node/Scoket.io server.
