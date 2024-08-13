describe('Filter Functionality Tests', () => {
  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    // Log in before running the tests
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').should('be.visible').type('test1@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });

  beforeEach(() => {
    // Assuming that user login is required and you have a command to log in the user
    // Visit the home page first
    cy.visit('/home');

    // Ensure the home page loads correctly
    cy.url().should('include', '/home');
    cy.get('.home-page').should('be.visible');

    // Click on the filter button to go to the filter page
    cy.get('.filter-button.profile').click();
    cy.url().should('include', '/filter');
  });

  it('Should display filter options correctly', () => {
    cy.contains('Property Type').should('be.visible');
    cy.contains('Room Type').should('be.visible');
    cy.contains('Meal Plan').should('be.visible');
    cy.contains('Academic Programs').should('be.visible');
    cy.contains('Hostel Activities').should('be.visible');
    cy.get('input[type="range"][min="0"][max="2000"]').should('be.visible');
    cy.get('input[type="range"][min="0"][max="5"]').should('be.visible');
  });
 

  it('Should handle no results found', () => {
    // Apply filters that yield no results
    cy.get('button').contains('Residence').click();
    cy.get('button').contains('Yes').click();
    cy.get('.apply-filter-button').click();

    cy.url().should('include', '/home');
    cy.get('.card').should('not.exist'); // Ensure no hostels are shown
  });

  it('Should handle filter edge cases', () => {
    // Set extreme values for price
    cy.get('input[type="range"][min="0"][max="2000"]').first().invoke('val', 0).trigger('change');
    cy.get('input[type="range"][min="0"][max="2000"]').last().invoke('val', 2000).trigger('change');

    // Apply filter
    cy.get('.apply-filter-button').click();

    // Ensure that results are within the expected range
    cy.url().should('include', '/home');
    cy.get('.card').should('exist');
    // Additional checks for specific results can be added here
  });

  it('Should preserve sorting order after applying filters', () => {
    // Assuming sorting is done by rating
    cy.setLocalStorage('orderBy', 'rating'); // Set sort field
    cy.setLocalStorage('order', 'high-to-low'); // Set sort order

    // Apply some filters
    cy.get('button').contains('House').click();
    cy.get('.apply-filter-button').click();

    cy.url().should('include', '/home');

    // Check if results are sorted by rating in high-to-low order
    cy.get('.list').then($list => {
      const ratings = [...$list.find('.card-rating')].map(el => parseFloat(el.innerText));
      expect(ratings).to.deep.equal([...ratings].sort((a, b) => b - a));
    });
  });

  // Utility to set local storage
  Cypress.Commands.add('setLocalStorage', (key, value) => {
    cy.window().then(win => {
      win.localStorage.setItem(key, value);
    });
  });
});

