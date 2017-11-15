import React, {Component} from 'react'
import DayDisplay from './DayDisplay'
import { Tabs, Radio, TimePicker } from 'antd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import moment from 'moment'
const {TabPane} = Tabs

class FiveDayDisplay extends Component {
  state = {
    timeString: '9 AM'
  }
  updateTime = (time, timeString) => {
    this.setState({timeString})
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.forecast[key].hasOwnProperty(this.nextState.timeString)
  // }
  render () {
    let {forecast} = this.props
    let tabs = Object.keys(forecast).map((key, i) => {
                    return (Object.keys(forecast[key]).length === 0 ? null :
                      <TabPane tab={key} key={i}>
                        <DayDisplay day={forecast[key][this.state.timeString]} times={Object.keys(forecast[key])} updateTime={this.updateTime}/>
                      </TabPane>
                    )
                  })
    return (
        <Tabs
          defaultActiveKey='0'
          tabPosition='top'
          style={{ height: '50%' }}
        >
          {tabs}
        </Tabs>
  )
}
}
export default FiveDayDisplay
