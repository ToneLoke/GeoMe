import React, {Component} from 'react'
import DayDisplay from './DayDisplay'
import { Tabs, Radio, TimePicker } from 'antd'
import moment from 'moment'
const TabPane = Tabs.TabPane

class FiveDayDisplay extends Component {
  updateTime = (time, timeString) => {
    console.log(time, timeString)
  }
  render () {
    let {forecast} = this.props
    return (
      <div>
        <Tabs
          defaultActiveKey='0'
          tabPosition='left'
          style={{ height: '50%' }}
        >
          {
            Object.keys(forecast)
            .map((key, i) => {
              return Object.keys(forecast[key]).length === 0 ? null : <TabPane tab={key} key={i}><DayDisplay day={forecast[key]['6 PM']} updateTime={this.updateTime}/></TabPane>
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default FiveDayDisplay
