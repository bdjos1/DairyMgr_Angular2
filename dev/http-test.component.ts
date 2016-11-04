import {Component} from 'angular2/core';
import {HTTPTestService} from './http-test.service';


@Component({
    selector: 'http-test',
    template: `
      <button (click)="onTestGet()">Test Get request</button>
      <p>Test {{getData}}</p>
      <button (click)="onTestPost()">Test Post request</button>
      <p>Test {{postData}}</p>	  	  
    `,
	providers: [HTTPTestService],
	
})
export class HttpTestComponent {
 getData: string;
 postData: string;
 
 constructor(private _httpService: HTTPTestService) {}
 
 onTestGet(){
   this._httpService.getCurrentTime()
   .subscribe(
    data => this.getData = JSON.stringify(data),
	error => alert(error),
	() => console.log("FINISHED")
   );
 }
 
 onTestPost(){
   this._httpService.postJSON()
   .subscribe(
    data => this.postData = JSON.stringify(data),
	error => alert(error),
	() => console.log("FINISHED")
   );
 }
 
}