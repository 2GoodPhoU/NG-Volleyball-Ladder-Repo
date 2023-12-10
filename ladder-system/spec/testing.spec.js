//import {Dashboard} from "../src/pages/Dashboard.jsx";
//import {Ladder} from "../src/pages/Ladder.jsx";
//import {Login} from "../src/pages/Login.jsx";
//import {Register} from "../src/pages/Register.jsx";
//import {Settings} from "../src/pages/Settings.jsx";
//import {Team} from "../src/pages/Team.jsx";
//import {UserManager} from "../src/pages/UserManager.jsx";

//import { handleSubmitChange, handleNoteChange } from './Settings';

describe("NGVball Function Tests", function(){
  let setModeLabel, setNotifyMode, react;
  let myDashboardClass, myLadderClass, myLoginClass, myRegisterClass, mySettingsClass, myTeamClass, myUserManagerClass;
  var utils;
  const [users, setUsers] = useState([]);
  /* Settings,jsx */
  const handleSubmitChange = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    //console.log('Form submitted');
    // log the new user names for testing purposes
    console.log({
        newUsername: data.get("newUsername"),
        newPassword: data.get("newPassword"),
        newName: data.get("newName"),
        enewEmailmail: data.get("newEmail"),
    });
  }
  const handleNoteChange = (event) => {

    const mode = event.target.name;
    //switch to Notificaiton
    setModeLabel(mode)
    setNotifyMode(mode === "Notification");
  }

  /* Login.jsx */

  useEffect(() => {
      window.localStorage.clear();
      getUsers();
  }, []);

  async function getUsers() {
      const { data } = await supabase
      .from('users')
      .select();
      
      setUsers(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    for (var i = 0; i < users.length; i++)
        if (users[i].username === username)
            break;

    if (i >= users.length && users[i - 1].username !== username)
        return;

    if (users[i].password === pass) {
        window.localStorage.setItem('user', JSON.stringify(users[i]));
        navigate(`./Dashboard/`);
    }
}

    /* Inilitize setters */
    beforeAll(()=> {
      react = require("react");
      utils = require("react-dom/test-utils");
      setModeLabel = jasmine.createSpy('setModeLabel');
      setNotifyMode = jasmine.createSpy('setNotifyMode');
      users = [
        { username: "user1", password: "password1" }];

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
/*
    it("Should handleSubmit", function(){
      const username = "user1";
      const pass = "password1";

      const event = {
          preventDefault: jasmine.createSpy('preventDefault')
      };

      handleSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(localStorageSpy).toHaveBeenCalledWith('user', JSON.stringify(users[0]));
      expect(navigateSpy).toHaveBeenCalledWith(`./Dashboard/`)

    });
*/
})