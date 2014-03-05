var HomeController = function () {
	var self = this;

	self.getIndex = function (req, res) {
		res.render('index', { title: 'Express' });
	}

	self.getInvoice = function (req, res) {
		
	}
}

module.exports = HomeController;