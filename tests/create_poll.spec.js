
Feature('Poll');

Scenario('Create a poll', (I) => {
    I.amOnPage('http://localhost:3000')
    I.fillField({'id': 'title'}, 'When shall I do my birthday Barbecue?')
    I.fillField({'id': 'date'}, '01/01/2021')
    I.click({'id': 'submit'})
    I.see('My poll: When shall I do my birthday Barbecue?')
})
