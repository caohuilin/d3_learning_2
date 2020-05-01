import React from 'react'
import { renderChart, renderChartFunc, renderChartLine } from './renderChart'
import './App.css'
import { lineOption } from './constants'

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null
  time: NodeJS.Timeout | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  demo1() {
    const data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8]
    this.time = setInterval(() => {
      data.shift()
      data.push(Math.round(Math.random() * 100))
      if (this.ref) {
        renderChart(this.ref, data)
      } else {
        console.error('dom not exit')
      }
    }, 1500)
  }

  demo2() {
    const data = (x: number) => {
      return x * x + 15
    }
    this.time = setInterval(() => {
      if (this.ref) {
        renderChartFunc(this.ref, data)
      } else {
        console.error('dom not exit')
      }
    }, 1500)
  }

  demoLine() {
    if (this.ref) {
      renderChartLine(this.ref, lineOption)
    } else {
      console.error('dom not exit')
    }
  }

  componentDidMount() {
    // this.demo1()
    // this.demo2()
    this.demoLine()
  }

  componentWillUnmount() {
    if (this.time) {
      clearInterval(this.time)
    }
  }

  render() {
    return <div className="chart" ref={this.setRef}></div>
  }
}
