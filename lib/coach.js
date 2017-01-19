//@flow
import moment from 'moment'

const toInt = (time: moment$Moment) : number => {
  if (typeof time == "undefined") alert('waiiit')
  if (typeof time.utc == "undefined") alert('wat')

  return time.utc().unix()
}

export default class Coach {
  _rounds: Array<number>
  startTime: ?moment$Moment
  _currentTimeFunc: Function
  goal: number
  minutes: number

  constructor (options : Object = {}) {
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

  elapsedSeconds () : number {
    if (!this.startTime) return 0

    let start = toInt(this.startTime)

    return toInt(moment()) - start
  }

  roundGoal () {
    if (!this.goal) return this.average()

    let remainingRounds = this.goal - this._rounds.length
    let timeInSeconds = (this.minutes * 60)
    let remainingTime = timeInSeconds - this.lastRoundSeconds()
    return remainingTime / remainingRounds
  }

  lastRoundSeconds () {
    return this.lastRound() - this.elapsedSeconds()
  }

  lastRound () {
    if (!this.startTime) return 0

    if (!this._rounds.length) { return toInt(this.startTime) }
    let round = this._rounds[this._rounds.length - 1]
    return round
  }

  remainingTime () {
    let nextGoal = this.lastRound() + this.roundGoal()
    return nextGoal - this.elapsedSeconds()
  }

  reset () {
    this._rounds = []
    this.startTime = null
  }

  startTime () {
    return this.startTime
  }

  currentTime () {
    return this._currentTimeFunc()
  }

  start () {
    this.startTime = moment()
    this._rounds = []
  }

  recordRound () {
    this._rounds.push(toInt(moment()) || this.currentTime())
  }
}
