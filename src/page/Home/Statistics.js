import React from 'react';
import Echarts from '../../component/EchartsReact';
import dateFormat from '../../util/dateFormat';

export default class Statistics extends React.Component {
  render() {
    let {ele = [], meituan = []} = this.props.data;

    if (!ele.length) return <div style={{textAlign: 'center'}}>暂无数据</div>;

    return (
      <div>
        <Echarts
          style={{height: '300px', width: '100%'}}
          option={{
            grid: {
              top: 30,
              bottom: 24,
              right: 0
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              formatter: params => {
                let [ele, meituan] = params;
                return `${dateFormat(new Date(ele.name), 'yyyy-MM-dd')}<br/>
                    饿了么: ${ele.value} 元<br/>
                    美&nbsp;&nbsp;&nbsp;团: ${meituan.value} 元`;
              }
            },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                color: '#666',
                formatter: value => {
                  return dateFormat(new Date(value), 'MM-dd');
                }
              },
              splitLine: {
                show: false
              },
              data: ele.map(o => o.date).reverse()
            },
            yAxis: {
              name: '总金额(千元)',
              nameTextStyle: {
                color: '#666'
              },
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                color: '#666',
                formatter: value => Number(value / 1000).toFixed(0)
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            series: [
              {
                data: ele.map(o => o.totalPrice).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(0,141,225)'
                },
                type: 'line'
              },
              {
                data: meituan.map(o => o.totalPrice).reverse(),
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                lineStyle: {
                  color: 'rgb(255,209,97)'
                },
                type: 'line'
              }
            ]
          }}
        />
      </div>
    );
  }
}