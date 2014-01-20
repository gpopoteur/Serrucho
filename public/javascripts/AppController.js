function Expense(args) {
	var self = this;

	self.person = args.person;
	self.bougth = args.bougth;
	self.amount = Number(args.amount);
	self.owed = 0;

	self.getOwed = function (args) {
		var owed = ( args.total / (args.expenses.length) ) - self.amount;
		self.owed = owed;
	}

	return self;
}

app.controller("AppController", function ($scope, $http){

	// Form Objects
	$scope.person = {};
	$scope.expense = {
		person: 'German',
		bougth: 'Pollo',
		amount: 15.4
	};

	// Total
	$scope.total = 0;

	// Data
	$scope.people = [];
	$scope.expenses = [];

	// Create a Person
	$scope.createPerson = function(){

	}

	// Create a Expense
	$scope.addExpense = function(){
		var exp = new Expense($scope.expense);

		$scope.expenses.push(exp);
		$scope.expense = {};

		// Get Owed
		getAllOwed();
	}

	var getAllOwed = function () {
		$scope.total = 0;
		for (var i = 0; i < $scope.expenses.length; i++) {
			var e = $scope.expenses[i];
			e.getOwed({ total: $scope.total , expenses: $scope.expenses });

			$scope.total = e.amount;
		};
	}

	// Retrieve Data
	$scope.getData = function(){

	}

});q