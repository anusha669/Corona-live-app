import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  country = '';
  countryInformation;
  allInfo;
  countryInfo:boolean = false
  data1;
  historical_data;
  data: string[][];
  historical_data_obtained: boolean = false;
  loadChart : boolean = false;
  constructor(private ser: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllInfo();
  }
  getAllInfo()
  {
    this.ser.getAllInfo().subscribe(res => {
      this.allInfo = res;
    })
  }
  searchCountry()
  {
        this.ser.getCountryInfo(this.country).subscribe(resultCountry => {
        this.countryInformation = resultCountry;
        if(this.countryInformation)
        {
          this.countryInfo = true;
          this.drawHistoricalGraph(this.countryInformation["country"]);
          this.loadChart = !this.loadChart;
        }   
        else{
          this.countryInfo = false;
          this.loadChart = false;
        }
      })
  } 

  drawHistoricalGraph(country){
      if(this.historical_data_obtained == false)
      {
        this.ser.getHistoricalData().subscribe(result =>{
          this.historical_data = result;
          this.loadChart = true;
          this.lineChartData(country)
          this.historical_data_obtained = true;
          this.drawLineChart(country);
        })
      }
      else{
        // this.loadChart = false
        this.lineChartData(country)
        this.drawLineChart(country)
      }
  }

  lineChartData(country){
    this.data = [ ['Date', 'Cases'] ];
    for(let i = 0;i < this.historical_data.length; i++)
    {
      if(this.historical_data[i]["country"] == country)
      {
        let arr = Object.keys(this.historical_data[i]["timeline"]["cases"])
        for(let j = 18; j < arr.length; j++)
        {
          let today_cases = this.historical_data[i]["timeline"]["cases"][arr[j]] - this.historical_data[i]["timeline"]["cases"][arr[j-1]];
          console.log(today_cases);
          this.data.push([ arr[j] , today_cases ]);
        }
        break
      }
    }
  }

  drawLineChart(country)
  {
    this.data1 = {
      chartType : "LineChart",
      dataTable : this.data,
      options : {
        title: 'Graph Representing the rise of covid-19 in '+ country,
        curveType: 'function',
        legend: { position: 'top' },
        chartArea : {
          height : '400',
          width : '85%'
        }, 
        height : 600,
        vAxis : {
          title : "Total Cases recorded"
        },
        hAxis: {
          title : "Date (mm/dd/yy)"
        }
      }
    }
    console.log(this.loadChart);

  }

}
