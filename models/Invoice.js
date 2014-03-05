var Invoice = function (db) {
	var self = this,
		_db = db;

	self.newInvoice = function (callback) {
		
	}

	self.getInvoice = function (id, callback) {
		_db.collection('invoice', function (err, item) {
			collection.find({'_id': id })
		})	
	}

};

module.exports = Invoice;