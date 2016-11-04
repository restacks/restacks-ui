import * as React from 'react';
import {RaisedButton, Card, CardActions, CardHeader, CardText} from 'material-ui';
import { increment, decrement } from '../../redux/modules/counter/';
import { ICounter } from '../../models/counter';
const { connect } = require('react-redux');
const s = require('./style.css');

interface IProps {
  counter: ICounter;
  increment: Redux.ActionCreator;
  decrement: Redux.ActionCreator;
}

@connect(
  state => ({ counter: state.counter }),
  dispatch => ({
    decrement: () => dispatch(decrement()),
    increment: () => dispatch(increment()),
  })
)
class Counter extends React.Component<IProps, void> {

  public render() {
    const { increment, decrement, counter } = this.props;

    return (
      <div className={s.counter}>
        <Card>
          <CardHeader
            title="Counter"
            subtitle={`this is a simple counter: ${counter.count}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <RaisedButton label="INCREMENT" onClick={increment} primary/>
            <RaisedButton label="DECREMENT" onClick={decrement}
                disabled={counter.count <= 0} secondary/>
          </CardActions>
          <CardText expandable={true}>
            <h4>Counter Example</h4>
            <button
              name="incBtn"
              onClick={increment}>
                INCREMENT
            </button>
            <button
              name="decBtn"
              onClick={decrement}
              disabled={counter.count <= 0}>
                DECREMENT
            </button>
            <p>{counter.count}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}

export { Counter }
