Feature: Video page

  @tablet @desktop @mobile
  Scenario: As a user I want to see a video not found page when the video doesn't exist
    Given I go to the "/m/123456/slug" page
    Then the page should be "/e/video-not-found"
    And the subheader title should be "This video doesn't exist"

  @tablet @desktop @mobile
  Scenario: As a user I want to watch a video and to see the play icon
    Given I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    When I wait until the video is loaded
    And the play icon should be visible

  @mobile @tablet @desktop
  Scenario: As a user I want to see the video title and description below the video
    Given I am still on the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    Then the video title is "Spotlight 3 min"
    And the video duration label is "3 min"
    And the video description is:
    """
    Starring Michael Keaton, Mark Ruffalo, Rachel McAdams, Liev Schreiber, Brian d’Arcy James and Stanley Tucci, Spotlight tells the riveting true story of the Pulitzer Prize-winning Boston Globe investigation that would rock the city and cause a crisis in one of the world’s oldest and most trusted institutions.
    """

  @mobile @tablet @desktop
  Scenario: As a user I want to see the video title above the video and description below the video when having videoTitlePosition on "above"
    Given I set the configLocation to "fixtures/config/videoTitlePosition.json"
    And I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    Then the video title is above the video
    And the video title is "Spotlight 3 min"
    And the video duration label is "3 min"
    And the video description is:
    """
    Starring Michael Keaton, Mark Ruffalo, Rachel McAdams, Liev Schreiber, Brian d’Arcy James and Stanley Tucci, Spotlight tells the riveting true story of the Pulitzer Prize-winning Boston Globe investigation that would rock the city and cause a crisis in one of the world’s oldest and most trusted institutions.
    """

  @tablet @desktop
  Scenario: As a user I want to see the Next Up title
    Given I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    When I scroll to the next up slider
    Then the next up title is shown

  @mobile @tablet @desktop
  Scenario: As a user I want to be able to navigate back to the dashboard by clicking the back button
    Given I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    When I click on the back button in the toolbar
    Then the page should be "index"

  @desktop @mobile @tablet
  Scenario: As a user I want to be able to start video playback
    Given I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    When I wait until the video is loaded
    And I start video playback
    Then the video should be playing

  @desktop @mobile @tablet
  Scenario: As a user I expect the page title and og tags to match the video
    Given I go to the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    Then the page title should be "Spotlight"
    And the description should be:
    """
    Starring Michael Keaton, Mark Ruffalo, Rachel McAdams, Liev Schreiber, Brian d’Arcy James and Stanley Tucci, Spotlight tells the riveting true story of the Pulitzer Prize-winning Boston Globe investigation that would rock the city and cause a crisis in one of the world’s oldest and most trusted institutions.
    """
    And the canonical path should be "/m/Iyfst4Se/spotlight?list=lrYLc95e"

  @desktop @tablet
  Scenario: As a user I expect the page title and og tags to match the video when the video changes
    Given I am still on the "/m/Iyfst4Se/spotlight?list=lrYLc95e" page
    When I scroll to the next up slider
    And I click on the 2nd visible card in the next up slider
    And I wait until the page is "/m/uNXCVIsW/touched-with-fire?list=lrYLc95e"
    Then the page title should be "Touched with Fire"
    And the description should be:
    """
    Touched With Fire stars Katie Homes and Luke Kirby as two poets with bipolar disorder whose art is fueled by their emotional extremes. When they meet in a treatment facility, their chemistry is instant and intense driving each other's mania to new heights. They pursue their passion which breaks outside the bounds of sanity, swinging them from fantastical highs to tormented lows until they ultimately must choose between sanity and love.
    """
    And the canonical path should be "/m/uNXCVIsW/touched-with-fire?list=lrYLc95e"

  @desktop @tablet
  Scenario: As a user I want to see the right title and metadata after the player starts playing the next item from the playlist
    Given I am still on the "/m/LjBvF1FX/the-girl-in-the-book?list=lrYLc95e" page
    When I wait until the video is loaded
    And I start playing the next playlist item
    Then the page title should be "Spotlight"
    And the description should be:
    """
    Starring Michael Keaton, Mark Ruffalo, Rachel McAdams, Liev Schreiber, Brian d’Arcy James and Stanley Tucci, Spotlight tells the riveting true story of the Pulitzer Prize-winning Boston Globe investigation that would rock the city and cause a crisis in one of the world’s oldest and most trusted institutions.
    """
    And the canonical path should be "/m/Iyfst4Se/spotlight?list=lrYLc95e"

  @desktop @tablet @mobile
  Scenario: As a user I want to see tags below the video description when enabled
    Given I set the configLocation to "fixtures/config/enableTags.json"
    And I go to the "/m/LjBvF1FX/?list=lrYLc95e" page
    When I scroll to the video description
    And I expand the video description
    Then the video tags should be visible
    When I click the first video tag
    Then the page should be "/t/drama"
