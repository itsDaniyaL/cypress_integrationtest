/// <reference types="cypress" />

//Variable created to reduce hardcoding
var DotNumber = 2;

describe("Lazy Loading Testing", function () {
    it("Test Case 1 - Visit the website", function () {
        //Visiting the Website
        cy.visit('http://localhost:3000/'); //Arrange 
        //Verifying the Carousel is visible
        cy.get('#infinite-carousel').should(($carousel) => { //Act
            expect($carousel).to.have.length(1); // Assert
        })
    })

    it('Test Case 2 - Lazy Load - Checking if Image-14 is visible', function () {
        //As all the images load instantly(under 500 milliseconds) and sliding is not required for all the images to load hence
        //Identifying image exists but not visible
        cy.clearCookies(); //Arrange
        cy.exec('npm cache clear --force') //Arrange
        cy.get('li:nth-child(14) img', { timeout: 200 }).should($LazyLoadedImage => {
            expect($LazyLoadedImage).to.have.length(1);
        })
        cy.get('li:nth-child(14) img').should('not.be.visible').and('exist');
        //Checking if images are visible with in first 500 milliseconds of loaidng the website. Set it to 300 milliseconds as previous specs take time.
        cy.get('.InfiniteCarouselArrow.InfiniteCarouselArrowNext').click();
        cy.get('.InfiniteCarouselArrow.InfiniteCarouselArrowNext').click();
        cy.get('li:nth-child(14) img').should('be.visible');
    })
})

describe("Verify Number of items to show per responsive breakpoint (at least 3)", function () {
    it("Test Case 3 - Visit the website", function () {
        //Visiting the Website
        cy.visit('http://localhost:3000/'); //Arrange 
        //Verifying the Carousel is visible
        cy.get('#infinite-carousel').should(($carousel) => { //Act
            expect($carousel).to.have.length(1); // Assert
        })
    })

    it("Test Case 4 - Verify Carousel Frame is Visible", function () {
        cy.get('.InfiniteCarouselFrame').should('be.visible'); //Act & Assert
    })

    it("Test Case 5 - Verify items visible at least 3 for Mobile Device", function () {
        cy.viewport(700, 700); //Arrange
        //Verifying if Number of Images currently visible are atleast 3
        cy.get('li:nth-child(6) img').should('be.visible'); //Assert
        cy.get('li:nth-child(7) img').should('be.visible'); //Assert
        cy.get('li:nth-child(8) img').should('be.visible'); //Assert
        //Verifying if Number of Images that are not currently visible
        cy.get('li:nth-child(4) img').should('not.be.visible'); //Assert
        cy.get('li:nth-child(9) img').should('not.be.visible'); //Assert
    })

    it("Test Case 6 - Verify items visible at least 3 for Desktop Device", function () {
        cy.viewport(1920, 1080); //Arrange
        //Verifying if Number of Images currently visible are atleast 3
        //4 Images will be visible as width of the screen is increased more then 768
        cy.get('li:nth-child(6) img').should('be.visible'); //Assert
        cy.get('li:nth-child(7) img').should('be.visible'); //Assert
        cy.get('li:nth-child(8) img').should('be.visible'); //Assert
        cy.get('li:nth-child(9) img').should('be.visible'); //Assert
        //Verifying if Number of Images that are not currently visible
        cy.get('li:nth-child(4) img').should('not.be.visible'); //Assert
        cy.get('li:nth-child(11) img').should('not.be.visible'); //Assert
    })
})

describe("Verify Dots functionality", function () {
    it("Test Case 7 - Visit the website", function () {
        //Visiting the Website
        cy.visit('http://localhost:3000/'); //Arrange 
        //Verifying the Carousel is visible
        cy.get('#infinite-carousel').should(($carousel) => { //Act
            expect($carousel).to.have.length(1); // Assert
        })
    })

    it("Test Case 8 - Verify if Dots are visible and exist on the screen", function () {
        //Identifying If Dots were visible
        cy.get('ul.InfiniteCarouselDots').should(($carousel) => { //Arrange & Assert
            expect($carousel).to.have.length(1);
        })
        cy.get('ul.InfiniteCarouselDots').should('be.visible'); //Assert
    })

    it("Test Case 9 - Verify second dot is not currently active", function () {
        //Idetifying if Second Dot is not Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon').then($NotVisible => { // Arrange
            if (!($NotVisible.find('.InfiniteCarouselDotActiveIcon').length > 0)) {
                cy.log('2nd Dot Not Visible');
            }
        })
    })

    it("Test Case 10 - Verify second dot is active after clicking it", function () {
        cy.wait(500); // Arrange
        //Click
        cy.get('#infinite-carousel > ul > button:nth-child(' + DotNumber + ')').click(); // Act
        //Verifying if Second dot is Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon.InfiniteCarouselDotActiveIcon').should('be.visible'); // Assert
    })

    DotNumber += 1;

    it("Test Case 11 - Verify third dot is not currently active", function () {
        //Identying if third dot is not Active 
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon').then($NotVisible => { //Arrange
            if (!($NotVisible.find('.InfiniteCarouselDotActiveIcon').length > 0)) { //Assert
                cy.log('3rd Dot Not Visible');
            }
        })
    })

    it("Test Case 12 - Verify third dot is active after clicking it", function () {
        cy.wait(500); //Arrange
        //Click
        cy.get('#infinite-carousel > ul > button:nth-child(' + DotNumber + ')').click(); //Act
        //Verfiying if third dot is Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon.InfiniteCarouselDotActiveIcon').should('be.visible'); //Assert
    })
})



describe("Verify Arrows Functionality", function () {
    DotNumber = 2;
    it("Test Case 13 - Visit the website", function () {
        //Visiting the Website
        cy.visit('http://localhost:3000/'); //Arrange 
        //Verifying the Carousel is visible
        cy.get('#infinite-carousel').should(($carousel) => { //Act
            expect($carousel).to.have.length(1); // Assert
        })
    })

    it("Test Case 14 - Verify if Arrows are visible and exist", function () {
        cy.get('i.InfiniteCarouselArrowIcon').should(($carousel) => { //Arrange
            expect($carousel).to.have.length(2);
        })
        cy.get('i.InfiniteCarouselArrowIcon.InfiniteCarouselArrowPrevIcon').should('be.visible'); //Assert
        cy.get('i.InfiniteCarouselArrowIcon.InfiniteCarouselArrowNextIcon').should('be.visible'); //Assert
    })

    it("Test Case 15 - Verify second dot is not currently active", function () {
        //Idetifying if Second Dot is not Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon').then($NotVisible => { //Arrange
            if (!($NotVisible.find('.InfiniteCarouselDotActiveIcon').length > 0)) { //Assert
                cy.log('2nd Dot Not Visible');
            }
        })
    })

    it("Test Case 16 - Verify if Left Arrow works", function () {
        cy.get('.InfiniteCarouselArrow.InfiniteCarouselArrowNext').click(); // Act
        cy.log(DotNumber);
        //Verifying if Second dot is Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon.InfiniteCarouselDotActiveIcon').should('be.visible'); // Assert
    })

    it("Test Case 17 - Verify first dot is not currently active", function () {
        DotNumber -= 1;
        //Idetifying if Second Dot is not Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon').then($NotVisible => {
            if (!($NotVisible.find('.InfiniteCarouselDotActiveIcon').length > 0)) {
                cy.log('2nd Dot Not Visible');
            }
        })
    })

    it("Test Case 18 - Verify if Right Arrow works", function () {
        cy.wait(500);
        cy.get('.InfiniteCarouselArrow.InfiniteCarouselArrowPrev').click(); // Act
        //Verifying if Second dot is Active
        cy.get('[data-testid="infinite-carousel-dots-' + (DotNumber - 1) + '"] > .InfiniteCarouselDotIcon.InfiniteCarouselDotActiveIcon').should('be.visible'); // Assert              
    })
})
