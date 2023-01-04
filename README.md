# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Compile protobuf files

In the project directory, you can run:

### `buf generate proto`

## Testing Amino messages

* start local regen node with `testnet` as chain-id and `uregen` as denom.
* enable rest api and allow cors in `app.toml` file.
* create a new account in keplr wallet and send few tokens to keplr account.
