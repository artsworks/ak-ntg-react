This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![image](https://user-images.githubusercontent.com/7718628/47253486-3b9f8a00-d49f-11e8-9ecb-d1a23ae0e80d.png)

## Task completed
1. Data request from [API](https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump
) using axios
2. Data displayed up-to-date with ticking countdown (red highlight below 120sec)
3. Required fields (Event Name, Event Venue, Time the event starts, iconography)
4. UI styling as BetEasy Brand
5. Unit test: _exceeding time limit, but added quick snapshot test for stateless component_
6. Filter races by type
7. Error handling from API

## How-to Run

In the root folder, there is `.env` file that determines `PORT` where this project will runs, also `REACT_APP_TIMENOW` to adjust dateTimeNow as the data from server is outdated.

However if you wish to use actual current date, please set `REACT_APP_TIMENOW` to `''` or remove it and do `yarn start` again.

In the project directory, you can run:

### `yarn`

This will install all the project dependency needed.

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:80](http://localhost:80) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Runs `react-scripts test` that will run written test also check current code against saved snapshot.

## Folder Structure

```
ak-react/
  .env
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    assets/
    containers/
    containers/
      App/
        App.css
        App.js
        App.test.js
    index.scss
    index.js
```
