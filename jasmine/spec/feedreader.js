/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds:', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         //Test Statement - Are RSS feeds defined?
        it('RSS Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //Test Statement - Are URLs defined?
         it('Urls are defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         //Test Statement - Are Names are defined?
         it('Names are defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu:', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         const menuHid = document.querySelector('body');
         const menuIcon = document.querySelector('.menu-icon-link');
         //Test Statement - Confirm that Menu is Hide initialy.
         it('Menu is hidden', function() {
            //const menuHid = document.querySelector('body');
            expect(menuHid.classList.contains('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        //Test Statement - When Clicked Menu Unhides or Hides.
          it('Menu on click hides/unhides', function() {
            //On first click
            menuIcon.click();
            expect(menuHid.classList.contains('menu-hidden')).toBe(false);
            //On second click
            menuIcon.click();
            expect(menuHid.classList.contains('menu-hidden')).not.toBe(false);
        });
    });

        /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries:', function() {

         /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         const feedContainer = document.querySelector('.feed');
        //Handle Async Request
         beforeEach(function(done) {
            loadFeed(0, done);
         });
         //Test Statement - Confirm loadFeed() completes.
         it('LoadFeed completes', function() {
            //console.log(feedContainer.children);
            expect(feedContainer.children).toBeDefined();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         const newFeed = []; // Stores feeds as they are loaded.
         const feedContainer = document.querySelector('.feed');
        //Handle Async Request
         beforeEach(function(done) {
            loadFeed(0);
            //create a array list then loop over the entrys.
            Array.from(feedContainer.children).forEach(function(entry) {
                newFeed.push(entry.innerText);
                //console.log(entry.innerText);
            });
            loadFeed(1, done);
         });
         //Test Statement - Confirm next feed content changes.
         it('Content actually changes when new feed is loaded', function() {
            //create a array list then loop over the entrys and use
            // use index to check first feed to the new feed.
            Array.from(feedContainer.children).forEach(function(entry,index) {
                //console.log(newFeed);
                //console.log(entry.innerText,('vs'),newFeed[index]);
                expect(entry.innerText === newFeed[index]).not.toBe(true);
            });
         });
    })
});