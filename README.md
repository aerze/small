# Small

## About

A game using Phaser with TypeScript and WebPack.

## Setup

```sh
npm install -g typescript tslint 
npm install
npm start
```

## NPM Commands
```sh
npm run build:client  # compiles client-side TypeScript
npm run watch:client  # same as build:client, but watches client/src directory for changes

npm server            # start server at server/dist/index.js
npm build:server      # compiles server-side TypeScript
npm watch:server      # same as build:server, but watches server/src directory for changes

npm run start         # runs both build commands and start's server
npm start             # same as above
```

## Development

For development on the game client you can use `npm run watch:client`
This will enable browsersync and reload page on successful change and compilation

For server development running `npm run watch:server` will rebuild the server
but WILL NOT RELOAD the server you still have to run it using `npm run server`


## Todo
 - [ ] Add pm2 config file to run/watch server
 