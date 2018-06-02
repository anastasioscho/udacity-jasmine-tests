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
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

   jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    describe('RSS Feeds', function() {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it ('have defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it ('have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* This suite is all about the main menu */

    describe('The menu', function() {
        /* This test ensures that all the necessary menu-related elements are defined */

        it ('related elements are defined', function() {
            expect($('body')).toBeDefined();
            expect($('.menu-icon-link')).toBeDefined();
        });

        /* This test ensures the menu element is hidden by default. */

        it ('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */

        it ('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that each menu item corresponds to a valid feed item */

        it ('has valid items', function() {
            const feedList = $('.feed-list')
            expect(feedList).toBeDefined();

            const feedListItems = feedList.find('a');
            expect(feedListItems.length).toBe(allFeeds.length);

            feedListItems.each(function(index) {
                var feedListItem = $(feedListItems[index]).data('id');
                expect(feedListItem).toBeDefined();
                expect(feedListItem).toBeGreaterThan(-1);
                expect(feedListItem).toBeLessThan(allFeeds.length);
            });
        });
    });

    /* This test suite is all about the initial entries */

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it ('are at least one', function(done) {
            var container = $('.feed');
            expect(container).toBeDefined();

            const children = container.children();
            expect(children).toBeDefined();

            expect(children.length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite is all about selecting a new feed */

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var firstResult;
        var secondResult;
        var container = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstResult = container.html();
                loadFeed(1, function() {
                    secondResult = container.html();
                    done();
                });
            });
        });

        it ('is different than the previous one', function(done) {
            var container = $('.feed');
            expect(firstResult === secondResult).not.toBe(true);
            done();
        });
    });
}());
