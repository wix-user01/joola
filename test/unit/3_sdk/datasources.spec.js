/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


describe("sdk-datasources", function () {
	var _store, _bypassToken;
	before(function (done) {
		_store = joola.config.authentication.store;
		_bypassToken = joola.config.authentication.bypassToken;
		joola.config.set('authentication:store', 'bypass');
		joola.config.set('authentication:bypassToken', '123');

		joolaio.TOKEN = '123';

			done();

	});

	it("should return a valid list of data sources", function (done) {
		console.log(_sdk.dispatch);
		_sdk.dispatch.datasources.list(function (err) {
			return done(err);
		});
	});

	xit("should add a data source", function (done) {
		var ds = {
			name: 'testSuite-sdk',
			type: 'mysql',
			dbhost: 'db.joola.io',
			dbport: 3306,
			dbname: 'master',
			dbuser: 'test',
			dbpass: 'test'
		};
		_sdk.dispatch.datasources.add(ds, function (err, datasource) {
			if (err)
				return done(err);
			expect(datasource).to.be.ok;
			return done();
		});
	});

	xit("should get a data source", function (done) {
		_sdk.dispatch.datasources.get('testSuite-sdk', function (err, datasource) {
			if (err)
				return done(err);
			expect(datasource).to.be.ok;
			expect(datasource.name).to.equal('testSuite-sdk');
			return done();
		});
	});

	xit("should update a data source", function (done) {
		var ds = {
			name: 'testSuite-sdk',
			type: 'mysql',
			dbhost: 'db.joola.io',
			dbport: 3306,
			dbname: 'master',
			dbuser: 'test2',
			dbpass: 'test2'
		};
		_sdk.dispatch.datasources.update(ds, function (err, datasource) {
			if (err)
				return done(err);
			expect(datasource.type).to.equal('mysql');
			return done();
		});
	});

	xit("should delete a data source", function (done) {
		_sdk.dispatch.datasources.delete({name: 'testSuite-sdk'}, function (err) {
			if (err)
				return done(err);
			_sdk.dispatch.datasources.list(function (err, datasources) {
				if (err)
					return done(err);

				var exist = _.filter(datasources, function (item) {
					return item.name == 'testSuite-sdk';
				});
				try {
					expect(exist.length).to.equal(0);
					return done();
				}
				catch (ex) {
					return done(ex);
				}
			})
		});
	});

	after(function (done) {
		joola.config.set('authentication:store', _store);
		joola.config.set('authentication:bypassToken', _bypassToken);
		done();
	});
});