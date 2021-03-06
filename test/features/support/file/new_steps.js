import { expect, should, assert } from 'chai'
import { Given, When, Then } from 'cucumber'
import _ from 'lodash'

When(/^Data Curator is open$/, async function () {
  const title = await this.app.client.waitUntilWindowLoaded().getTitle()
  expect(title).to.equal('Data Curator')
})

Given(/^the active table has "(.+)"$/, async function (data) {
  // include headers in data sent
  console.log(`incoming data`)
  console.log(`.${data}.`)
  // const dataToSend = JSON.stringify(data.raw())
  // const dataToSend = JSON.parse(data)
  await this.app.webContents.send('loadDataIntoCurrentHot', data)
  // wait until hot data changes before continuing
  const parentSelector = '.tab-pane.active .editor.handsontable'
  const elementsSelector = '.ht_master table tr:first-of-type td'
  let self = this
  await this.app.client.waitUntil(async function () {
    let actualFirstDataRow = await self.app.client.element(parentSelector)
      .elements(elementsSelector)
      .getText()
    return _.difference(actualFirstDataRow, ['', '', '']).length !== 0
  }, 5000)
  // compare data available in hot view
  let actualFirstDataRow = await this.app.client.element(parentSelector)
    .elements(elementsSelector).getText()
  console.log('first row', actualFirstDataRow)
  // expect(actualFirstDataRow).to.deep.equal(data.rows()[0])
})

Then(/^1 window should be displayed/, function () {
  return this.app.client.waitUntilWindowLoaded()
    .getWindowCount()
    .then(function(count) {
      expect(count).to.equal(1)
    })
})

Then(/^the window should have (\d+) tab[s]?$/, function (numberOfTabs) {
  return this.app.client
    .waitForVisible('#csvEditor')
    .elements('.tab-header')
    .then(function(response) {
      expect(response.value.length).to.equal(numberOfTabs)
    })
})

Then(/^the (?:new |)tab should be in the right-most position$/, function () {
  return this.app.client
    .waitForVisible('#csvEditor')
    .getAttribute('.tab-header', 'class')
    .then(function(response) {
      let lastTab = response.length - 1
      expect(response[lastTab]).to.contain('active')
    })
})

Then(/^the (?:new |)tab should have a unique name$/, async function () {
  const activeText = await this.app.client
    .waitForVisible('#csvEditor')
    .getText('.tab-header.active')
  let allText = await this.app.client
    .waitForVisible('#csvEditor')
    .getText('.tab-header')
  _.pull(allText, activeText)
  expect(allText).to.not.contain(activeText)
})

Then(/^the (?:new |)tab should have 1 table$/, function () {
  return this.app.client
    .waitForVisible('#csvEditor')
    .elements('.tab-content')
    .then(function(response) {
      expect(response.value.length).to.equal(1)
    })
    .elements('.active .editor.handsontable')
    .then(function(response) {
      expect(response.value.length).to.equal(1)
    })
})

// the table should have {int} row by {int} columns
Then(/^the (?:new |)table (?:should have |has )(\d+) row[s]? by (\d+) column[s]?$/, function (rowCount, colCount) {
  return this.app.client.element('.active .editor.handsontable')
    .elements('.ht_master table tr th')
    .then(function(response) {
      expect(response.value.length).to.deep.equal(rowCount)
    })
    .element('.ht_master table tr')
    .elements('td')
    .then(function(response) {
      expect(response.value.length).to.deep.equal(colCount)
    })
})

Then(/^the (?:new |)table should be empty$/, function () {
  return this.app.client.element('.active .editor.handsontable')
    .getText('.ht_master table tr td')
    .then(function(array) {
      let text = array.join('')
      expect(text).to.equal('')
    })
})

Then(/^the cursor should be in the (?:new )table$/, function () {
  return this.app.client.element('.active .editor.handsontable')
    .getAttribute('.ht_master table tr th', 'class')
    .then(function(response) {
      const selectedRowHeaderClass = 'ht__highlight'
      expect(response).to.contain(selectedRowHeaderClass)
    })
})

Then(/^the cursor should be in row (\d+), column (\d+)$/, function (rowNumber, colNumber) {
  const parentSelector = '.tab-pane.active .editor.handsontable'
  return this.app.client.element(parentSelector)
    .getAttribute('.ht_master table tr th', 'class')
    .then(function(response) {
      const selectedRowHeaderClass = 'ht__highlight'
      // when only 1 value returned no longer an array
      if (_.isArray(response)) {
        expect(response[rowNumber - 1]).to.contain(selectedRowHeaderClass)
      } else if (rowNumber === 1) {
        expect(response).to.contain(selectedRowHeaderClass)
      } else {
        throw new Error(`There is only 1 row in the table, but the test tried to look for row number: ${rowNumber}`)
      }
    })
    .element(parentSelector)
    .getAttribute(`.ht_master table tr:nth-child(${rowNumber}) td`, 'class')
    .then(function(response) {
      const selectedCellClass = 'current highlight'
      // when only 1 value returned no longer an array
      if (_.isArray(response)) {
        expect(response[colNumber - 1]).to.contain(selectedCellClass)
      } else if (colNumber === 1) {
        expect(response).to.contain(selectedCellClass)
      } else {
        throw new Error(`There is only 1 column in the table, but the test tried to look for column number: ${colNumber}`)
      }
    })
})
