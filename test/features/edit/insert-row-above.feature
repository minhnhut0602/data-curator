Feature: Insert Row Above
  As a Data Packager  
  I want to insert another row above the current row  
  So that I can add more data to the data table  

  RULES
  =====

  - If a row is inserted above the first row and the CSV dialect has 'headerRow' set to 'true', then the 'name' property for each column may be invalidated.
  - The "Insert Row Above" command can be invoked using a menu item, keyboard shortcut or a context menu in the data tab

  Scenario: Insert Row Above
    Given the cursor is in a data table
    When "Insert Row Above" is invoked
    Then a row should be inserted above the current row
