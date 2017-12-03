import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { Llink } from 'react-router-dom';

const Analytics = ({ posts }) => {
  const data = d3.nest().key(d => d.createdAt).entries(posts)
  const format = d3.timeFormat('%Y-%m-%d') // 2017-12-03T14:46:10.036Z
  data.forEach(d => {
    d.date = format(new Date(d.key)) // 2017-12-03T09:46:10Z
    d.count = +d.values.length
  })

  console.log(data)

  // data.unshift({ date: date-1, count: random(1, 10) })
  // data.unshift({ date: date-2, count: random(1, 10) })
  // data.unshift({ date: date-3, count: random(1, 10) })
  // data.unshift({ date: date-4, count: random(1, 10) })



  // 1. convert d.date into date object
  // 2. prepend an array of object with { date: date1, count: randome(1, 10) } before 
  // [{ date: date1, count: random(1, 10) }, { date: date2, count: random(1, 10) }, {date: date3, count: random(1, 10)} ]



  const margin = { top: 50, right: 10, bottom: 100, left: 60 }
  const width = 600 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;

  let x = d3.scaleBand().range([0, width])
  let y = d3.scaleLinear().range([height, 0])
  let xAxis = d3.axisBottom().scale(x)
  let yAxis = d3.axisLeft().scale(y).ticks(6)

  let tooltip = d3.select('chart').append('div')
    .attr('class', 'tooltip').style('opacity', 0)

  const svg = d3.select('.chart').append('div')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')

  return (
    <div>
      <h1>Coming Soon!</h1>

    </div>
  )

}

const mapStateToProps = ({ userPosts }) => {
  return {
    posts: userPosts
  } 
}

export default connect(mapStateToProps)(Analytics)