//import {Dashboard} from "../src/pages/Dashboard.jsx";
//import {Ladder} from "../src/pages/Ladder.jsx";
//import {Login} from "../src/pages/Login.jsx";
//import {Register} from "../src/pages/Register.jsx";
//import {Settings} from "../src/pages/Settings.jsx";
//import {Team} from "../src/pages/Team.jsx";
//import {UserManager} from "../src/pages/UserManager.jsx";

//import * as settings from "../src/pages/Settings.jsx";

describe("Settings Function Test", function(){
  let setModeLabel, setNotifyMode, react;
  let myDashboardClass, myLadderClass, myLoginClass, myRegisterClass, mySettingsClass, myTeamClass, myUserManagerClass;
  var utils;

    /* Inilitize setters */
    beforeAll(()=> {
      react = require("react");
      utils = require("react-dom/test-utils");
      setModeLabel = jasmine.createSpy('setModeLabel');
      setNotifyMode = jasmine.createSpy('setNotifyMode');

      myDashboardClass = jasmine.createSpy("../src/pages/Dashboard.jsx");
      myLadderClass = jasmine.createSpy("../src/pages/Ladder.jsx");
      myLoginClass = jasmine.createSpy("../src/pages/Login.jsx");
      myRegisterClass = jasmine.createSpy("../src/pages/Register.jsx");
      mySettingsClass = jasmine.createSpy("../src/pages/Settings.jsx");
      myTeamClass = jasmine.createSpy("../src/pages/Team.jsx");
      myUserManagerClass = jasmine.createSpy("../src/pages/UserManager.jsx");

    })
    

    /* test for handleSubmitChnge function */
    it("should handle submit change function correctly", function() {
        const mockFormData = {
            get: (key) => {
              // Simulate form data retrieval based on the key
              // Example: Return specific values for each key (mocked form data)
              if (key === 'newUsername') {
                return 'UserJohn';
              } else if (key === 'newPassword') {
                return 'password123';
              } else if (key === 'newLastName') {
                return 'Doe';
              } else if (key === 'newFirstName') {
                return 'John';
              } else if (key === 'newEmail') {
                return 'JohnDoe@example.com';
              }
              // Handle other form keys as needed
            },
          };
        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            currentTarget: {get:() => mockFormData},
        };
        handleSubmitChange(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });
    
    /* tst for handleNoteChange function */
    it("Should update vars for handleNoteChange function", function(){
        const event = {
            target:{ name: "Notification"}
        };
        handleNoteChange(event);

        expect(setModeLabel).toHaveBeenCalledWith("Notification");
        expect(setNotifyMode).toHaveBeenCalledWith(true);

    });

})