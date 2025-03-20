import { dataContext } from '../resources/dataContext'

class DatePicker {
  currentDate: Date
  monthValues: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  }

  constructor() {
    this.currentDate = new Date()
  }

  get getDatePickerIcon() {
    return cy.get('[class*="react-datepicker__calendar-icon"]')
  }
  get getCurrentDate() {
    return cy.get('[aria-current="date"]')
  }
  get getHighlightedDate() {
    return cy.get('div[class*=day--keyboard-selected]')
  }
  get getPreSelectedDate() {
    return cy.get('.react-datepicker__day--selected')
  }
  public formatDate(date: string) {
    const yyyyMMddRegEx = /^\d{4}-\d{2}-\d{2}$/
    if (yyyyMMddRegEx.test(date)) {
      return date
    }
    const [day, month, year] = date.split('-')
    return [year, month, day].join('-')
  }
  private closeCalender() {
    this.getDatePickerIcon.click()
  }
  private goToNextMonth(noOfMonths: number) {
    for (let i = 1; i <= noOfMonths; i++) {
      cy.get('button[aria-label="Next Month"]').click()
    }
  }
  private goToPreviousMonth(noOfMonths: number) {
    for (let i = 1; i <= noOfMonths; i++) {
      cy.get('button[aria-label="Previous Month"]').click()
    }
  }
  private goToNextYear() {
    for (let i = 1; i <= 12; i++) {
      cy.get('button[aria-label="Next Month"]').click()
    }
  }
  private goToPreviousYear() {
    for (let i = 1; i <= 12; i++) {
      cy.get('button[aria-label="Previous Month"]').click()
    }
  }

  private selectDate(dateMonth: number, date: number) {
    const pickedDate = new Date()
    pickedDate.setMonth(dateMonth)
    const month = pickedDate.toLocaleString('default', { month: 'long' })
    cy.xpath(`//div[contains(@aria-label,'${month}') and text()='${date}']`).click()
  }
  public getCurrentDateObject(): Date {
    return this.currentDate
  }
  public getPreviousNthDateFromCurrentDate(n: number): Date {
    const date = new Date()
    date.setDate(this.currentDate.getDate() - n)
    return date
  }
  public getNextNthDateFromCurrentDate(n: number): Date {
    const date = new Date()
    date.setDate(this.currentDate.getDate() + n)
    return date
  }
  public getPreviousNthDateFromGivenDate(givenDate: Date, n: number) {
    givenDate.setDate(givenDate.getDate() - n)
    return givenDate
  }
  public getNextNthDateFromGivenDate(givenDate: Date, n: number) {
    givenDate.setDate(givenDate.getDate() + n)
    return givenDate
  }
  selectCurrentDate() {
    this.getCurrentDate.click()
  }

  private goToYear(year: number) {
    cy.get('.react-datepicker__current-month').then(($el) => {
      const [currentMonth, currentYear] = $el.text().split(' ')
      if (year < parseInt(currentYear)) {
        this.goToPreviousMonth(this.monthValues[currentMonth])
        for (let i = 1; i < parseInt(currentYear) - year; i++) {
          this.goToPreviousYear()
        }
      }

      if (year > parseInt(currentYear)) {
        this.goToNextMonth(13 - this.monthValues[currentMonth])
        for (let i = 1; i < year - parseInt(currentYear); i++) {
          this.goToNextYear()
        }
      }
    })
  }

  private goToMonth(month: number) {
    cy.get('.react-datepicker__current-month').then(($el) => {
      const currentMonth = $el.text().split(' ')[0]
      if (this.monthValues[currentMonth] < month) {
        this.goToNextMonth(month - this.monthValues[currentMonth])
      }

      if (this.monthValues[currentMonth] > month) {
        this.goToPreviousMonth(this.monthValues[currentMonth] - month)
      }
    })
  }
  public getDateInDDMMYYYYFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  public getDateInYYYYMMDDFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }
  public getSameDayAfterMonths(date: string, n: number): string {
    const [day, month, year] = date.split('-').map(Number)
    const newDate = new Date(year, month - 1, day)
    newDate.setMonth(newDate.getMonth() + n)

    if (newDate.getDate() !== day) {
      newDate.setDate(0)
    }

    const newDay = newDate.getDate().toString().padStart(2, '0')
    const newMonth = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const newYear = newDate.getFullYear()
    return `${newDay}-${newMonth}-${newYear}`
  }
  public getNumberOfDays(startDate: string, endDate: string): number {
    const date1 = new Date(this.formatDate(startDate))
    const date2 = new Date(this.formatDate(endDate))
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) + 1
  }
  public isLeapYear(dateString: string): boolean {
    const year = new Date(this.formatDate(dateString)).getFullYear()
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }
  public getRemainingDaysInYear(dateString: string): number {
    const givenDate = new Date(this.formatDate(dateString))
    const lastDayOfYear = new Date(givenDate.getFullYear(), 11, 31)
    const timeDiff = lastDayOfYear.getTime() - givenDate.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
  }
  public getDaysCompletedInYear(dateString: string): number {
    const givenDate = new Date(this.formatDate(dateString))
    const firstDayOfYear = new Date(givenDate.getFullYear(), 0, 1)
    const timeDiff = givenDate.getTime() - firstDayOfYear.getTime()
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
  }
  getDemoLoanCreationDate(bankDate: string): string {
    const date = new Date(this.formatDate(bankDate))
    const year = date.getFullYear()
    const month = date.getMonth()

    const selectionDate = new Date(year, month - 1, date.getDate() + 1)
    if (month === 0) {
      selectionDate.setFullYear(year - 1)
    }

    return this.getDateInYYYYMMDDFormat(selectionDate)
  }
  getDateAfterNdays(presentDate: string, numberOfDays: number): string {
    const currentDate = new Date(this.formatDate(presentDate))
    const futureDate = new Date(currentDate)
    futureDate.setDate(futureDate.getDate() + numberOfDays)
    return futureDate.toISOString().split('T')[0]
  }

  selectHighlightedDate() {
    this.getHighlightedDate.click()
  }
  selectPreSelectedDate() {
    this.getPreSelectedDate.click()
  }

  selectPreviousNthDayFromCurrentDate(n: number) {
    const previousDate = this.getPreviousNthDateFromCurrentDate(n)
    const previousDateYear: number = previousDate.getFullYear()
    const previousDateMonth: number = previousDate.getMonth()
    this.goToYear(previousDateYear)
    this.goToMonth(previousDateMonth + 1)
    this.selectDate(previousDateMonth, previousDate.getDate())
  }

  selectNextNthDayFromCurrentDate(n: number) {
    const nextDate = this.getNextNthDateFromCurrentDate(n)
    const nextDateYear: number = nextDate.getFullYear()
    const nextDateMonth: number = nextDate.getMonth()
    this.goToYear(nextDateYear)
    this.goToMonth(nextDateMonth + 1)
    this.selectDate(nextDateMonth, nextDate.getDate())
  }

  selectPreviousNthDayFromGivenDate(date: string, n: number) {
    const previousDate = this.getPreviousNthDateFromGivenDate(new Date(this.formatDate(date)), n)
    const previousDateYear: number = previousDate.getFullYear()
    const previousDateMonth: number = previousDate.getMonth()
    this.goToYear(previousDateYear)
    this.goToMonth(previousDateMonth + 1)
    this.selectDate(previousDateMonth, previousDate.getDate())
  }

  selectNextNthDayFromGivenDate(date: string, n: number) {
    const nextDate = this.getNextNthDateFromGivenDate(new Date(this.formatDate(date)), n)
    const nextDateYear: number = nextDate.getFullYear()
    const nextDateMonth: number = nextDate.getMonth()
    this.goToYear(nextDateYear)
    this.goToMonth(nextDateMonth + 1)
    this.selectDate(nextDateMonth, nextDate.getDate())
  }
  selectGivenDate(date: string) {
    const givenDate = new Date(this.formatDate(date))
    const givenDateYear: number = givenDate.getFullYear()
    const givenDateMonth: number = givenDate.getMonth()
    this.goToYear(givenDateYear)
    this.goToMonth(givenDateMonth + 1)
    this.selectDate(givenDateMonth, givenDate.getDate())
  }
  selectDemoLoanCreationDate(bankDate: string) {
    const date = new Date(this.formatDate(bankDate))
    const year = date.getFullYear()
    const month = date.getMonth()

    const selectionDate = new Date(year, month - 1, date.getDate() + 1)
    if (month === 0) {
      selectionDate.setFullYear(year - 1)
    }
    dataContext.setData('loanCreationDate', this.getDateInDDMMYYYYFormat(selectionDate))
    const selectionYear: number = selectionDate.getFullYear()
    const selectionMonth: number = selectionDate.getMonth()
    this.goToYear(selectionYear)
    this.goToMonth(selectionMonth + 1)
    this.selectDate(selectionMonth, selectionDate.getDate())
  }
}

export default new DatePicker()
