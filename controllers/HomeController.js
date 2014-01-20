var HomeController = function () {
	var self = this;

	self.getIndex = function (req, res) {
		res.render('index', { title: 'Express' });
	}
}

module.exports = HomeController;