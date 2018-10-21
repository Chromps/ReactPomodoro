import React, { Component } from 'react';
import './App.css';

import Information from './Information';
import Settings from './Settings'

class App extends Component {


  constructor(props){
    super(props);

    this.state = {
      minutes: 25,
      seconds: '00',
      pomTime: 25,
      breakTime: 5,
      running: false,
      isPom: true,
      intervalVar: null,
      counter: 0

    }

    this.incrementBreak = this.incrementBreak.bind(this)
    this.decrementBreak = this.decrementBreak.bind(this)
    this.incrementPomodoro = this.incrementPomodoro.bind(this)
    this.decrementPomodoro = this.decrementPomodoro.bind(this)
  }

  componentDidUpdate() {
    let {minutes, seconds} = this.state
    document.title = `(${minutes}:${seconds}) ${this.state.isPom ? 'Time to work!': 'Time to play!'}`.toString()
  }

  incrementBreak() {
    let { breakTime } = this.state
    this.setState({
      breakTime: ++breakTime
    })
  }

  decrementBreak() {
    let { breakTime } = this.state
    if(breakTime > 1) {
      this.setState({
        breakTime: --breakTime
      })
    }
  }

  incrementPomodoro() {
    let { pomTime } = this.state
    let newVal = ++pomTime
    this.setState({
      minutes: newVal,
      pomTime: newVal
    })
  }

  decrementPomodoro() {
    let { pomTime } = this.state
    if(pomTime > 1) {
      let newVal = --pomTime
      this.setState({
        minutes: newVal,
        pomTime: newVal
      })
    }
  }

  tick(){
    // Looks like I was playing around with timing logic here, this is likely better handled by a library :)
    let { minutes, seconds, isPom, pomTime, breakTime, counter } = this.state

    if(minutes === 0 && seconds === '00'){
      if(isPom){
        this.setState({
          minutes: breakTime,
          seconds: '00',
          isPom: false
        });
      }
      else{
        this.setState({
          minutes: pomTime,
          seconds: '00',
          isPom: true,
          counter: ++counter
        })
      }
    } else if(seconds === '00' ){
      this.setState({
        minutes: --minutes,
        seconds: '59',
      });
    } else if (seconds > 10){
      this.setState({
        seconds: (parseInt(seconds, 10) - 1)
      });
    } else if(seconds > 0){
      this.setState({
        seconds: '0' + (parseInt(seconds, 10) - 1)
      })
    }
  }

  onStart(){
    let { running, intervalVar } = this.state
    if(!running){
      this.setState({
        running: true,
        intervalVar: setInterval(this.tick.bind(this), 1000)
      })
    }
    else {
      this.setState({
        running: false
      })
      clearInterval(intervalVar);
    }
  }

  reset(){
    let { pomTime, intervalVar } = this.state

    this.setState({
      minutes: pomTime,
      seconds: "00",
      running: false

    });
    clearInterval(intervalVar);

  }

  render() {
    const { counter, minutes, seconds, isPom, running, pomTime, breakTime } = this.state

    const pomodoroString = `Pomodoro Time: ${pomTime}:00`
    const breakString = `Break Time: ${breakTime}:00`

    return (
      <div className="App">

        <Information counter={counter} />

        <div>
          <div className="timer">
            {minutes}:{seconds}
            <br/>
            <span className={isPom? 'pomodoro' : 'break' }>{isPom? 'Pomodoro!' : 'Break Time!'}</span>
          </div>
          <br/>
          <button className={running ? "btn reset" : "btn start"} onClick={this.onStart.bind(this)}>{running ? 'Stop!' : 'Start!'}</button>
          <button className="btn reset" onClick={this.reset.bind(this)}>Reset</button>
        </div>
        <div className="settings">
          <Settings
           currentSettings={pomodoroString}
           plusClick={this.incrementPomodoro}
           minusClick={this.decrementPomodoro}
           />
          <Settings
           currentSettings={breakString}
           plusClick={this.incrementBreak}
           minusClick={this.decrementBreak}
           />
        </div>
      </div>
    );
  }
}

export default App;
