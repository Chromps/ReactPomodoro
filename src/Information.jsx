import React, { PropTypes } from 'react';

const Information = ({counter}) => {
    return (
        <div>
            <h1>React pomodoro clock</h1>
            <p>
                I took a break from <code>Free Code Camp</code> to start learning React!<br/>
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
                So far, you have completed <span className="pomodoro">{counter}</span> Pomodoros!
            </p>
        </div>
    );
}

export default Information

Information.propTypes = {
    counter: PropTypes.number.isRequired
}