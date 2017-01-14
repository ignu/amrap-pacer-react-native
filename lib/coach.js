import moment from 'moment'

const s = (time) => {
  if (typeof time === 'number') { return time }

  return time.utc().unix()
}

export default class Coach {
  constructor (options = {}) {
    let { currentTimeFunc, goal, minutes } = options

    this._rounds = []
    this.goal = goal
    this.minutes = minutes
    const defaultCurrentTime = () => moment()
    this._currentTimeFunc = currentTimeFunc || defaultCurrentTime
  }

  roundCount () {
    return this._rounds.length
  }

  average () {
    return this.elapsedSeconds() / (this.roundCount() || 1)
  }

  elapsedSeconds () {
    let start = s(this._startTime)

    return s(moment()) - start
  }

  roundGoal () {
    if (!this.goal) return this.average()

    let remainingRounds = this.goal - this._rounds.length
    let timeInSeconds = (this.minutes * 60)
    let remainingTime = timeInSeconds - this.lastRoundSeconds()
    return remainingTime / remainingRounds
  }

  lastRoundSeconds () {
    return s(this.lastRound()) - s(this.elapsedSeconds())
  }

  lastRound () {
    if (!this._rounds.length) { return s(this._startTime) }
    let round = this._rounds[this._rounds.length - 1]
    return s(round)
  }

  remainingTime () {
    let nextGoal = this.lastRound() + this.roundGoal()
    return nextGoal - s(this.elapsedSeconds())
  }

  reset () {
    this._rounds = []
    this._startTime = null
  }

  startTime () {
    return this._startTime
  }

  currentTime () {
    return this._currentTimeFunc()
  }

  start () {
    this._startTime = moment()
    this._rounds = []
  }

  recordRound (time) {
    this._rounds.push(time || this.currentTime())
  }
}
