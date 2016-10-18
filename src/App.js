import React, { Component } from 'react';
import './App.css';

class App extends Component {


  constructor(props){
    super(props);

    this.state = {
      minutes: 25,
      seconds: '00',
      pomTime: 25,
      breakTime: 5,
      runState: false,
      isPom: true,
      intervalVar: null,
      counter: 0

    }
  }
  componentDidUpdate(){
    document.title = "("+this.state.minutes +  ":" + this.state.seconds + ") React Pomodoro";
  }

  setBreakTime(direction){
    if(this.state.runState){
      return;
    }
    else if(direction === 'plus'){
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
    else if (direction === 'minus') {
      if(this.state.breakTime === 1){
        alert('Cannot go lower than 1 minute!');
        return;
      }
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
    }
  }
  setPomTime(direction){
    if(this.state.runState){
      return;
    }
    else if(direction === 'plus'){
      this.setState({
        pomTime: this.state.pomTime + 1,
        minutes: this.state.pomTime + 1,
        seconds: '00'
      });
    }
    else if (direction === 'minus') {
      if(this.state.pomTime === 1){
        alert('Cannot go lower than 1 minute!');
        return;
      }
      this.setState({
        pomTime: this.state.pomTime - 1,
        minutes: this.state.minutes - 1,
        seconds: '00'
      })
    }
  }

  tick(){
    if(this.state.minutes === 0 && this.state.seconds === '00'){
      if(this.state.isPom){
        this.setState({
          minutes: this.state.breakTime,
          seconds: '00',
          isPom: false
        });
      }
      else{
        this.setState({
          minutes: this.state.pomTime,
          seconds: '00',
          isPom: true,
          counter: this.state.counter+ 1
        })
      }
    }
    else if(this.state.seconds === '00' ){
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: '59',
      });
    }else if (this.state.seconds > 10){
      this.setState({
        seconds: parseInt(this.state.seconds, 10) - 1
      });
    }
    else if(this.state.seconds > 0){
      this.setState({
        seconds: '0' + (parseInt(this.state.seconds, 10) - 1)
      })
    }
  }
  onStart(){

    if(!this.state.runState){
      this.setState({
        runState: true,
        intervalVar: setInterval(this.tick.bind(this), 1000)
      })
    }
    else if(this.state.runState){
      this.setState({
        runState: false
      })
      clearInterval(this.state.intervalVar);
    }
  }
  handleReset(){

    this.setState({
      minutes: this.state.pomTime,
      seconds: "00",
      runState: false

    });
    clearInterval(this.state.intervalVar);

  }

  render() {
    return (
      <div className="App">
        <h1>React pomodoro clock</h1>
        <p>I took a break from <code>Free Code Camp</code> to start learning React!<br/>
          This is my first project using it.
        </p>
        <p className="description">
          Pomodoro is a productivity technique.  The traditional way to do it is by working
          a 25 minute uninterrupted sprint followed by a 5 minute break.  Some people like to do
          double pomodoros with 50 minute sprints followed by 10 minute breaks.  The idea behind
          the pomodoro is that it will allow you to focus much better while the timer is counting
          down because you have a defined end point.  However, what many people find is that they
          end up not noticing the break time because by then they have gotten into the illusive
          state of 'flow'.  Whatever your use I hope this tool is helpful for you!
        </p>
        <p>
          So far, you have completed <span className="pomodoro">{this.state.counter}</span> Pomodoros!
        </p>

        <div>
          <div className="timer">
            {this.state.minutes}:{this.state.seconds}
            <br/>
            <span className={this.state.isPom? 'pomodoro' : 'break' }>{this.state.isPom? 'Pomodoro!' : 'Break Time!'}</span>
          </div>
          <br/>
          <button className={this.state.runState ? "btn reset" : "btn start"} onClick={this.onStart.bind(this)}>{this.state.runState ? 'Stop!' : 'Start!'}</button>
          <button className="btn reset" onClick={this.handleReset.bind(this)}>Reset</button>
        </div>
        <div className="settings">
          <div className="subSettings">
            <span>Pomodoro Time: {this.state.pomTime}:00</span>
            <br/>
            <button className="btn" onClick={this.setPomTime.bind(this, 'plus')}>Plus</button>
            <button className="btn" onClick={this.setPomTime.bind(this, 'minus')}>Minus</button>
          </div>
          <div className="subSettings">
            <span>Break Time: {this.state.breakTime}:00</span>
            <br/>
            <button className="btn " onClick={this.setBreakTime.bind(this, 'plus')} >Plus</button>
            <button className="btn " onClick={this.setBreakTime.bind(this, 'minus')}>Minus</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
