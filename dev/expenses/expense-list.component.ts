import {Component} from 'angular2/core';
import {HomeComponent} from './home.component';
import {OnInit} from 'angular2/core';
import {ExpenseService} from "./expenses.service";
import {Expense} from "./expense";
import {Router} from "angular2/src/router/router";

@Component({
    selector: 'expense-list',
    template: `
        
		<button on-click="addReceipt()" class="button">Add Receipt</button>
		<table>
		  <thead>
		    <tr>
		      <th>Merchant Name</th>
		      <th>Merchant Address</th>
		      <th>Actions</th>
		    </tr>
		  </thead>
		  <tbody>
		     <tr *ngFor="#expense of expenses" on-click="onSelect(expense)"  [class.clicked]="selectedExpense === expense">
		      <td>{{expense.merchantName}}</td>
		      <td>{{expense.merchantAddress}}</td>
		      <td>
		        <button on-click="showDropdown(expense.id)" class="dropbtn">Actions</button>
            <div id="myDropdown_{{expense.id}}" on-blur="closeDropdown()" class="dropdown-content">
              <a on-click="editReceipt(expense)">Edit</a>
              <a on-click="deleteReceipt(expense)">Delete (No Confirm)</a>
            </div>
          </td>
		    </tr>
		    <!--tr on-blur="closeDropdown()">
		      <td><contact [contact]="selectedContact"></contact></td>
		    </tr-->
		  </tbody>
		</table>
    `,
	directives: [HomeComponent],
  providers: [ExpenseService],
	styleUrls : ["../src/css/app.css"]
})
export class ExpenseListComponent implements OnInit {
  public expenses: Expense[];
  public selectedExpense = {};

  constructor(private _expenseService: ExpenseService, private _router: Router) {}

  getExpenses() {
    this._expenseService.getExpenses().then((expenses: Expense[]) => this.expenses = expenses);
  }

  addReceipt() {
    this._router.navigate(['NewExpense']);
  }

  editReceipt(expense) {
    this._router.navigate(['NewExpenseWithID', {expense: expense}]);
  }

  deleteReceipt(expense) {
    this._expenseService.deleteExpense(expense);
  }

  onSelect(expense) {
    this.selectedExpense = expense;
  }

  ngOnInit(): any {
    this.getExpenses();
  }

  showDropdown(id) {
    var dropDownDiv = document.getElementById("myDropdown_" + id);
    dropDownDiv.classList.toggle("show");
  }

  closeDropdown() {
    alert("Closing Dropdown");
  }
}
