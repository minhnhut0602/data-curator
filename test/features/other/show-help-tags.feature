Feature: Show Help Tags
  As a User
  I want to access context-sensitive help
  So that I can learn how to use a control without needing to shift my focus away from the application interface

  Rules
  =====

    - Help Tags are invoked by hovering the cursor over a control or label
    - Help Tags can be dismissed by moving away from the control or label
    - Controls with associatied help tags are typically Toolbar buttons and Field labels
    - Help Tags contain simple HTML. Links launch in a separate browser windows
    - Delay showing the help tag until the cursor has hovered over the target for a “help-tag-delay” period
    - Hide the help tag when the cursor moves off the target

  Scenario: Show Help Tag
    Given Data Curator is open
    When a Help Tag is invoked
    Then display the Help Tag after the “help-tag-delay” period

  Scenario: Hide Help Tag
    Given Data Curator is open
    And a Help Tag is displayed
    When the Help Tag is dismissed
    Then hide the Help Tag
