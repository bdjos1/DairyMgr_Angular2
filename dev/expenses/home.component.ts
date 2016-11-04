import {Component} from 'angular2/core';

@Component({
    selector: 'home',
    template: `
			<div class="homeWrapper">
			  <div>
			    <h1>Application Home Page</h1>
			  </div>
			  <div class="homebody">
			    <p><b>This sample SPA show cases some of the most important aspsects
			       of AngularJS 2.0, such as:</b></p>
			    <ul>
			      <li>How to wire up components in single page application</li>
			      <li>Routing and Route Params</li>
			      <li>Using the Form Builder</li>
			    </ul>
			    <p><b>Future goals for the application:</b></p>
			    <ul>
			      <li>Use Node/Mongo DB backend to create Restful API</li>
			      <li>Consume Restful API to display data in application</li>
			      <li>Proper Authorization/Authentication</li>
			      <li>Globalization</li>
			      <li>Accessibility</li>
			      <li>Fully respsosive UI using plain CSS3</li>
			    </ul>
			  </div>
			</div>
    `,
})
export class HomeComponent {
  public contact = {};
}
