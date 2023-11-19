import {handleSubmitChange, handleNoteChange} from "./Settings.jsx";

describe("Settings Function Test", ()=>{

    /* Inilitize setters */
    const setModeLabel = jasmine.createSpy('setModeLabel');
    const setNotifyMode = jasmine.createSpy('setNotifyMode');

    /* test for handleSubmitChange function */
    it("should handle submit change function correctly", () => {
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
    it("Should update vars for handleNoteChange function", () =>{
        const event = {
            target:{ name: "Notification"}
        };
        handleNoteChange(event);

        expect(setModeLabel).toHaveBeenCalledWith("Notification");
        expect(setNotifyMode).toHaveBeenCalledWith(true);

    });

})