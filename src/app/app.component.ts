
import { Component , ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Country, State, PowerPlant, PowerGenFigures } from './_model/domainentities';
import { config } from './_config/config';
import { SharedService } from './_services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import {GoogleMap} from '@angular/google-maps';

export interface PowerSource {
  name: string;
  percentage: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  
    title = 'WebPowerPlantUI';

    stateCodeToName = new Map(); 
    // To store domain objects retrieved from rest api such as country, state and power plant
    country:  Country = new Country;
    lstState: Array<State> = new Array<State>(); 
    lstPowerPlant: Array<PowerPlant> = new Array<PowerPlant>(); 
    selectedState: State= new State();
    selectedPowerPlant: PowerPlant = new PowerPlant();

    // on screen labels
    name: string;
    errorLoadingMsg:string | undefined ;
    netPowerGeneration: string | undefined ;
    powerGenerationPercentage : string | undefined ;
      
    // To hold powergeneration source related information
    tbl_data: PowerSource[] = [];
    tbl_label: string[] = ['Source', 'Percentage'];
  
    
    // To load map and map related data with USA latlon
    @ViewChild(GoogleMap) map!: GoogleMap;
    marker1 =  { position: { lat:39.87119978852287, lng:-101.25264495178524 } , title: config.countryCode };
    markers = [this.marker1];        
    mapOptions: google.maps.MapOptions = {
      center: { lat: 39.87119978852287, lng:-101.25264495178524 },
      zoom:18
    };  

    // Use for pie chart drawing
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    public pieChartOptions: ChartConfiguration['options'] | undefined ;
    public pieChartData: ChartData<'pie', number[], string | string[]> | undefined ;
    public pieChartType: ChartType = 'pie';
  
    chart_data: number[]=[];


  constructor(private _sharedService: SharedService, private spinner: NgxSpinnerService) {
   this.name = '';  
  }
    
  loadChartData(inPowerGenerationFigures: PowerGenFigures) {

      var cgp   = inPowerGenerationFigures.coal_Generation_Percent;
      var ogp   = inPowerGenerationFigures.oil_Generation_Percent;
      var ggp   = inPowerGenerationFigures.gas_Generation_Percent;
      var ngp   = inPowerGenerationFigures.nuclear_Generation_Percent;
      var hgp   = inPowerGenerationFigures.hydro_Generation_Percent;
      var bgp   = inPowerGenerationFigures.biomass_Generation_Percent;
      var wgp   = inPowerGenerationFigures.wind_Generation_Percent;
      var sgp   = inPowerGenerationFigures.solar_Generation_Percent;
      var geogp = inPowerGenerationFigures.grothermal_Generation_Percent;
      var fgp   = inPowerGenerationFigures.fossil_Generation_Percent;
      var ugp   = inPowerGenerationFigures.unknown_Generation_Percent;
      
      this.tbl_data =[] ;       // use for table, reinitialize with latest data
      this.chart_data = [];     // use for chart, reinitialize with latest data

      var reusedHelper: number = +cgp;
      
      // Coal
      var p = {} as  PowerSource;
      reusedHelper =  Math.floor(+cgp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.coal_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);   
      
      // Oil
      p == {} as  PowerSource;
      reusedHelper =  Math.floor(+ogp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.oil_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p); 

      // Gas
      p =  {} as  PowerSource;
      reusedHelper =  Math.floor(+ggp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.gas_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p); 

      // Nuclear
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+ngp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.nuclear_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p); 
      
      
      // Hydro
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+hgp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.hydro_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);
      
      // Bio
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+bgp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.biomass_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);
      
      // Wind
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+wgp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.wind_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);

      // Solar
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+sgp *100);
      this.chart_data.push(reusedHelper);
      p.name = config.solar_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);
      
      // GeoThermal
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+geogp * 100);
      this.chart_data.push(reusedHelper);
      p.name = config.grothermal_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);

      // Fossil
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+fgp * 100);
      this.chart_data.push(reusedHelper);
      p.name = config.fossil_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);

      // Unknown
      p = {} as  PowerSource;
      reusedHelper =  Math.floor(+ugp * 100);
      this.chart_data.push(reusedHelper);
      p.name = config.unknown_Generation_Percent;
      p.percentage = reusedHelper;
      this.tbl_data.push(p);

  }


  public ngOnInit() {


      this.spinner.show();
      this.loadStateCodesWithNames();
      this.name = config.countryCode
      this.errorLoadingMsg = '';

      this._sharedService.loadPowerPlantData()
        	.subscribe(
            ( lstresult: Country) => {  this.country = lstresult as Country;
              
              if(this.country.lstState){
                
                this.lstState = this.country.lstState;
                this.netPowerGeneration = 'USA - Net Power Generation : ' + this.country.powerGenFigures.net_Generation.toString() + ' MWh';
                this.marker1 = { position: { lat:39.87119978852287, lng:-101.25264495178524 } , title: this.netPowerGeneration };
                this.markers = [];
                this.markers = [this.marker1]; 
                this.netPowerGeneration = this.country.powerGenFigures.net_Generation.toString();
                this.loadChartData(this.country.powerGenFigures);

                this.pieChartData =  {    
                  labels: [ 'Coal', 'Oil', 'Gas', 'Nuclear','Hydro', 'Bio','Wind', 'Solar' , 'GeoThermal', 'Fossil', 'Unknown'  ],
                  datasets: [ {
                  data: this.chart_data
                } ]};

                this.chart?.update();
              }
              
              this.spinner.hide();
             
              
        },
            ( error: any) => {
            console.log('Error loading data for due to connection issue:');
            console.log(error);
            this.errorLoadingMsg = config.serviceLoadingError;
            this.name = '';
            this.spinner.hide();
		    });


    this.pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        }  
      }
    };

    this.pieChartData =  {    
      labels: [ 'Coal', 'Oil', 'Gas', 'Nuclear','Hydro', 'Bio','Wind', 'Solar' , 'GeoThermal', 'Fossil', 'Unknown'  ],
      datasets: [ {
        data: this.chart_data
      } ]
    };

  }


  public ngAfterViewInit() {
    this.chart?.update();

  }


  getBounds(markers: any){
  
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers){
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }   

  onSelectState(selectedState: any): void {

    this.errorLoadingMsg = '';
      
    this.lstPowerPlant =  selectedState.power_plant;      
    this.markers =[];
      
    this.lstPowerPlant.forEach(element => {
      var label = element.name + '- Net Power Generation : ' + element.powerGenFigures.net_Generation.toString() + ' MWh';
      var marker = {position: { lat: element.latitude, lng: element.longitued },  title: label  };
      this.markers.push(marker);
        
    });
      
    const bounds = this.getBounds(this.markers);
    this.map.googleMap?.fitBounds(bounds);
    this.loadChartData(selectedState.powerGenFigures);
    this.name= this.stateCodeToName.get(selectedState.abbreviation);

    this._sharedService.loadGeoCodeForLocationUSA(this.name)
        	.subscribe(
            ( lstresult: any) => { var temp = lstresult as any;
            
            const bounds = this.getBounds(this.markers);
            this.map.googleMap?.fitBounds(bounds);
            
    },( error: any) => {
            console.log('Error calling google geocode service to locate region data:');
            console.log(error);
		    });


    
    this.pieChartData =  {    
      labels: [ 'Coal', 'Oil', 'Gas', 'Nuclear','Hydro', 'Bio','Wind', 'Solar' , 'GeoThermal', 'Fossil', 'Unknown'  ],
      datasets: [ {
        data: this.chart_data
      } ]
    };

    this.chart?.update();

}



    loadStateCodesWithNames() {

    this.stateCodeToName.set('AL','Alabama'); 
    this.stateCodeToName.set('AK','Alaska'); 
    this.stateCodeToName.set('AZ','Arizona');
    this.stateCodeToName.set('AR','Arkansas'); 
    this.stateCodeToName.set('CA','California');    
    this.stateCodeToName.set('CO','Colorado'); 
    this.stateCodeToName.set('CT','Connecticut');
    this.stateCodeToName.set('DE','Delaware'); 
    this.stateCodeToName.set('FL','Florida');
    this.stateCodeToName.set('GA','Georgia'); 
    this.stateCodeToName.set('HI','Hawaii');    
    this.stateCodeToName.set('ID','Idaho'); 
    this.stateCodeToName.set('IL','Illinois');
    this.stateCodeToName.set('IN','Indiana'); 
    this.stateCodeToName.set('IA','Iowa');
    this.stateCodeToName.set('KS','Kansas'); 
    this.stateCodeToName.set('KY','Kentucky');    
    this.stateCodeToName.set('LA','Louisiana'); 
    this.stateCodeToName.set('ME','Maine');
    this.stateCodeToName.set('MD','Maryland'); 
    this.stateCodeToName.set('MA','Massachusetts');
    this.stateCodeToName.set('MI','Michigan'); 
    this.stateCodeToName.set('MN','Minnesota');    
    this.stateCodeToName.set('MS','Mississippi'); 
    this.stateCodeToName.set('MO','Missouri');
    this.stateCodeToName.set('MT','Montana'); 
    this.stateCodeToName.set('NE','Nebraska');
    this.stateCodeToName.set('NV','Nevada'); 
    this.stateCodeToName.set('NH','New Hampshire');    
    this.stateCodeToName.set('NJ','New Jersey'); 
    this.stateCodeToName.set('NM','New Mexico');
    this.stateCodeToName.set('NY','New York'); 
    this.stateCodeToName.set('NC','North Carolina');
    this.stateCodeToName.set('ND','North Dakota'); 
    this.stateCodeToName.set('OH','Ohio');    
    this.stateCodeToName.set('OK','Oklahoma'); 
    this.stateCodeToName.set('OR','Oregon');
    this.stateCodeToName.set('PA','Pennsylvania'); 
    this.stateCodeToName.set('RI','Rhode Island');
    this.stateCodeToName.set('SC','South Carolina'); 
    this.stateCodeToName.set('SD','South Dakota');    
    this.stateCodeToName.set('TN','Tennessee'); 
    this.stateCodeToName.set('TX','Texas');
    this.stateCodeToName.set('UT','Utah');
    this.stateCodeToName.set('VT','Vermont');
    this.stateCodeToName.set('VA','Virginia');
    this.stateCodeToName.set('WA','Washington');
    this.stateCodeToName.set('VT','Vermont');
    this.stateCodeToName.set('VA','Virginia');
    this.stateCodeToName.set('WA','Washington');
    this.stateCodeToName.set('WV','West Virginia');
    this.stateCodeToName.set('WI','Wisconsin');
    this.stateCodeToName.set('WY','Wyoming');
    }


}
