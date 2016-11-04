import {Component} from 'angular2/core';
import {ExpenseListComponent} from "./expenses/expense-list.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {NewExpenseComponent} from "./expenses/new-expense.component";
import {HttpTestComponent} from "./http-test.component";
import {HomeComponent} from "./expenses/home.component";

@Component({
  selector: 'my-app',
  template: `
         <header class="banner">
	         <nav>
				     <a class="navBarLink" [routerLink]="['Expenses']">Expenses</a>
				     <a class="navBarLink" [routerLink]="['Home']">Home</a>
				    </nav>
	        </header>
			   <div class="main">
			     <router-outlet></router-outlet>
			     <!--http-test></http-test-->
			   </div>
    `,
  directives: [HomeComponent, ExpenseListComponent, HttpTestComponent, ROUTER_DIRECTIVES],
  styleUrls : ["../src/css/app.css"]
})
@RouteConfig ([
  {path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true},
  {path: '/expenses', name: 'Expenses', component: ExpenseListComponent},
  {path: '/newExpense', name: 'NewExpense', component: NewExpenseComponent},
  {path: '/newExpense/:expense', name: 'NewExpenseWithID', component: NewExpenseComponent},
])
export class AppComponent {


}

