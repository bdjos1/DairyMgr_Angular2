import {Component} from 'angular2/core';
import {ExpenseService} from './expenses.service';
import {Expense} from './expense';
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from 'angular2/core';
//import {ngSubmit} from 'angular2/platform';
import {ControlGroup} from 'angular2/common';
import {FormBuilder} from 'angular2/common';
import {Validators} from 'angular2/common';
//noinspection TypeScriptUnresolvedVariable
import construct = Reflect.construct;

@Component({
    selector: 'newExpense',
    template: `
        
		<!-- (onclick) NOT WORKING!!-->
		<!--h3 on-click="onSelect()">{{contact.firstName}}</h3-->
		<form [ngFormModel]="myForm" (ngSubmit)="onSubmit(myForm.value)">
		  <fieldset>
        <legend>Create or Update Expenses</legend>
		    <div class="formField">
		      <div class="labelWrapper">
		        <label for="mercID">Merchant ID: </label>
		      </div>
		      <div class="inputWrapper">
		        <input id="mercID" type="text" on-blur="validateId(myForm.value)" [disabled]="selectedExpense != null"
		        [ngFormControl]="myForm.controls['id']" #merchantID="ngForm"/>
		      </div>
		      <span class="invalidMsg" *ngIf="!merchantID.valid">Not Valid</span>
		    </div>
		    <div class="formField">
		      <div class="labelWrapper">
		        <label for="mercName">Merchant Name: </label>
		      </div>
		      <div class="inputWrapper">
		        <input id="mercName" type="text" 
		        [ngFormControl]="myForm.controls['merchantName']"/>
		      </div>
		    </div>
		    <div class="formField">
		      <div class="labelWrapper">
		        <label for="mercAdd">Merchant Address: </label>
		      </div>
		      <div class="inputWrapper">
		        <input id="mercAdd" type="text" 
		        [ngFormControl]="myForm.controls['merchantAddress']"/>
		      </div>
		    </div>
		    <div class="buttonWrapper">
		       <button [disabled]="!myForm.valid" type="submit">Submit (Unstyled)</button>
		       <button on-click="cancel()">Cancel</button>
		    </div>
		   
		  </fieldset>
		</form>
		
		<p></p>
		
    `,
	providers: [ExpenseService],
  styleUrls : ["../src/css/app.css"]
})
export class NewExpenseComponent implements OnInit {
  myForm: ControlGroup;
  public selectedExpense;

  constructor(private _expenseService: ExpenseService, private _router: Router, private _routeParams : RouteParams, private _formBuilder: FormBuilder) {
  }


 onSubmit(value, evt) {
   debugger;
   if (this.selectedExpense) {
     this._expenseService. modifyExpense(value);
   } else {
     // for cancel situation
     // TODO: Prob better way to do this !!
     if (value.id.length > 0) {
       this._expenseService.insertExpense(value);
     }
   }

   this._router.navigate(['Expenses']);
 }
  cancel() {
    // TODO: Fix cancel button, not working correctly!
    //this._router.navigate(['Expenses']);
  }

  validateId(value) {
    // TODO: Validate this properly and not useing a modal!
    if (value.id === "01" || value.id === "02") {
      alert("The Merchant ID field cant be '01' or '02'. It must be unique");
    }
  }

  ngOnInit():any {
    var id = "";
    var merchantName = "";
    var merchantAddress = "";
    this.selectedExpense = this._routeParams.get('expense');
    id = this.selectedExpense ? this.selectedExpense.id : id;
    merchantName = this.selectedExpense ? this.selectedExpense.merchantName : merchantName;
    merchantAddress = this.selectedExpense ? this.selectedExpense.merchantAddress : merchantAddress;

    this.myForm = this._formBuilder.group({
	  'id': [id, Validators.required],
      'merchantName': [merchantName],
	  'merchantAddress': [merchantAddress]
	});
  }
}
