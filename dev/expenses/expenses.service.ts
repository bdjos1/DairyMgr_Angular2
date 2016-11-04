import {Injectable} from 'angular2/core';
import {Expense} from './expense';
import {EXPENSES} from './mock-expenses';

@Injectable()
export class ExpenseService {
  getExpenses() {
    return Promise.resolve(EXPENSES);
  }

  insertExpense(expense: Expense) {
    Promise.resolve(EXPENSES).then((expenses: Expense[]) => expenses.push(expense));
  }

  deleteExpense(expense: Expense) {
    // TODO: Use ECMA2016 syntax with fat arrow function here (Tidy up)
    var promise = Promise.resolve(EXPENSES);
    return promise.then(this.bindExpenseForDeletion.bind(null, expense));
  }

  modifyExpense(expense: Expense) {
    // TODO: Use ECMA2016 syntax with fat arrow function here (Tidy up)
    var promise = Promise.resolve(EXPENSES);
    return promise.then(this.bindExpense.bind(null, expense));
  }

  bindExpense(updatedExpense, expenses) {
    expenses.forEach(function(expense) {
      if (expense.id === updatedExpense.id) {
        expense.merchantName = updatedExpense.merchantName;
        expense.merchantAddress = updatedExpense.merchantAddress;
      }
    });
    return expenses;
  }

  bindExpenseForDeletion(expenseToDelete, expenses) {
    expenses.forEach(function(expense, index) {
      if (expense === expenseToDelete) {
        expenses.splice(index, 1);
      }
    });
    return expenses;
  }
}
