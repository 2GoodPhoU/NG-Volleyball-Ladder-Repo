How to Run Locally:
In it's current state the Volleyball Ladder System can only be run locally. Here are the steps.
1. Download the NG-Volleyball-Ladder-Repo to your device.
2. Open your terminal and run the following:
   - cd NG-Volleyball-Ladder-Repo
   - cd ladder-system
   - npm i react-router-dom
   - npm i @supabase/supabase-js
   - npm install @mui/material @emotion/react @emotion/styled
   - npm install @mui/icons-material
   - npm start

If you get an error:
1. rm package-lock.json
2. npm install


///
/////Add Jasmine to your package.json/////
npm install --save-dev jasmine

/////Initialize Jasmine in your project/////
npx jasmine init

/////Set jasmine as your test script in your package.json/////

"scripts": { "test": "jasmine" }

/////Run your tests/////
npm test

////