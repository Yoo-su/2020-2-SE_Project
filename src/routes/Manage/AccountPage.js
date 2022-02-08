import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import './AccountPage.css';

export default function AccountPage(){
    const [accountInfo,setAccountInfo]=useState([]);
    const [monthly,setMonthly]=useState(0);
    const [contentType,setContentType]=useState("table");
    const [dataForGraph,setDataForGraph]=useState([]);
    

    function bringAccount(){
        axios.get('https://every-server.herokuapp.com/api/account').then(res=>{
            if(res.data.success===true){
                setAccountInfo(res.data.account);
                const tmp=res.data.account.map(d=>{
                    return {
                        "날짜":d.dateInfo,
                        "총매출":d.salesTotal,
                        "총지출":d.minusTotal,
                        "순이익":d.salesTotal-d.minusTotal
                    }
                })
                setDataForGraph(tmp);
                if (res.data.monthlySoon){
                    setMonthly(res.data.monthlySoon);
                }
                console.log(res.data);
            }else{alert('오류발생');window.location.href='#';}
        })
    }
    useEffect(()=>{
       bringAccount();
    },[]);
    return(
        <div id="accountPage">
            <div id="accountContent">
             <div id="accountTitle">
               <b>회계정보</b>
            </div>
            <div id="pureProfit"> 
            <b>●이번달 순이익:&nbsp;{monthly}&nbsp;원</b>
            {contentType==="table"?(<button id="graphChartBtn" onClick={()=>{
                setContentType("graph");
            }}>그래프보기</button>):(<button id="tableChartBtn" onClick={()=>{
                setContentType("table");
            }}>테이블보기</button>)}
            </div>
          <div id={contentType==="table"?"tableChartContent":"graphChartContent"} style={{height:contentType==="table"?"":"500px"}}>
          {contentType==="table"?(
          <Table id="accountTable" striped bordered hover>
              <thead>
               <tr>
                <th>날짜</th>
                <th>총매출액</th>
                <th>총지출액</th>
                <th>순이익</th>
                <th>임금지불액</th>
                <th>재료구매액</th>
                </tr>
              </thead>
              <tbody>
              {accountInfo.map(account=>(
                 <tr key={account.dateInfo}>
                  <td>{account.dateInfo}</td>
                  <td>{account.salesTotal}원</td>
                  <td>{account.minusTotal}원</td>
                  <td>{account.salesTotal-account.minusTotal}원</td>
                  <td>{account.wageMinus}원</td>
                  <td>{account.stockMinus}원</td>
                 </tr>))}
              </tbody>
          </Table>):(
              <ResponsiveBar 
                data={dataForGraph}
                keys={[
                      '총매출',
                    '총지출',
                    '순이익'
                ]}
                indexBy="날짜"
                margin={{ top: 50, right: 110, bottom: 50, left: 100 }}
                padding={0.4}
         
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                colors={{ scheme: 'set2' }}
                borderColor={{
                    from: 'color',
                    modifiers: [
                          [
                              'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '기간',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '매출/지출/순이익',
                    legendPosition: 'middle',
                    legendOffset: -70
                }}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                          [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                              {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="매장 월별 매출분석"
            />
          )
          }
            </div>
          </div>
        </div>
    );
}
