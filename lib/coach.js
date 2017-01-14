import moment from 'moment'

export default class Coach {
  constructor (options = {}) {
    let { currentTimeFunc, goal, minutes } = options

    this._rounds = []
    this.goal = goal
    this.minutes = minutes
    const defaultCurrentTime = () => moment()
    this._currentTimeFunc = currentTimeFunc || defaultCurrentTime
  }

  get roundCount () {
    return this._rounds.length
  }

  get average () {
    return this.elapsedSeconds / this.roundCount
  }

  get elapsedSeconds () {
    let start = this.secondsFor(this._startTime)

    return this.lastRound - start
  }

  get roundGoal () {
    if (!this.goal) return this.average

    let remainingRounds = this.goal - this._rounds.length
    let timeInSeconds = (this.minutes * 60)
    let remainingTime = timeInSeconds - this.lastRoundSeconds
    return remainingTime / remainingRounds
  }

  secondsFor (time) {
    if (typeof time === 'number') { return time }

    return time.utc().unix()
  }

  get lastRoundSeconds () {
    return this.secondsFor(this.lastRound) - this.secondsFor(this.startTime)
  }

  get lastRound () {
    if (!this._rounds.length) { return this._startTime }
    let round = this._rounds[this._rounds.length - 1]
    return this.secondsFor(round)
  }

  get remainingTime () {
    let nextGoal = this.lastRound + this.roundGoal
    return nextGoal - this.secondsFor(this.currentTime)
  }

  reset () {
    this._rounds = []
    this._startTime = null
  }

  get startTime () {
    return this._startTime
  }

  get currentTime () {
    return this._currentTimeFunc()
  }

  start () {
    this._startTime = moment()
    this._rounds = []
  }

  recordRound (time) {
    this._rounds.push(time || this.currentTime)
  }
}
