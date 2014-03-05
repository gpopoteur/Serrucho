function Expense(args) {
	var self = this;

	self.person = args.person || "";
	self.bougth = args.bougth || "";
	self.amount = Number(args.amount) || 0;
	self.owed = 0;

	self.getOwed = function (args) {
		var owed = ( args.total / (args.expenses.length) ) - self.amount;
		self.owed = owed;
	}

	return self;
}

app.controller("AppController", ['$scope', '$http', function ($scope, $http){

	// Form Objects
	$scope.person = {};
	$scope.expense = {};

	$scope.editExpenseObj;

	// Total
	$scope.total = 0;

	// Data
	$scope.expenses = [];

	// Create a Expense
	$scope.addExpense = function(){
		var exp = new Expense($scope.expense);
		$scope.expenses.push(exp);
		
		clearForm();

		// Get Owed
		getTotal(getAllOwed);
	};

	// Edit an expense
	$scope.editExpense = function (expense) {
		$scope.expense = angular.copy(expense);
		$scope.editExpenseObj = expense;
	};

	// Save Edit
	$scope.saveExpense = function () {
		var exp = new Expense($scope.expense);
		var index = $scope.expenses.indexOf($scope.editExpenseObj);
		$scope.expenses[index] = exp;

		clearForm();

		// Get Owed
		getTotal(getAllOwed);
	};

	// Cancel Edit
	$scope.cancelEditExpense = function () {
		$scope.expense = {};
		$scope.editExpenseObj = undefined;
	};

	$scope.deleteExpense = function (expense) {
		var index = $scope.expenses.indexOf(expense);
		$scope.expenses.splice(index, 1);

		// Get Owed
		getTotal(getAllOwed);
	};

	var clearForm = function () {
		$scope.editExpenseObj = undefined;
		$scope.expense = {};
	};

	var getTotal = function (callback) {
		$scope.total = 0;
		for (var i = 0; i < $scope.expenses.length; i++) {
			var e = $scope.expenses[i];
			$scope.total += e.amount;
		};

		if(callback !== undefined){
			callback();
		}
	};

	var getAllOwed = function () {
		for (var i = 0; i < $scope.expenses.length; i++) {
			var e = $scope.expenses[i];
			e.getOwed({ total: $scope.total , expenses: $scope.expenses });
		}
		$scope.$apply();
	};

	// Retrieve Data
	$scope.getData = function(){

	};

}]);