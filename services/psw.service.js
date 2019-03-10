'use strict';
const bcrypt = require('bcrypt');
//const genSalt = require('bluebird').promisify(bcrypt.genSalt, {context: bcrypt});
const HandleError = require('../libs/handleErrors');
const salted = 10;

module.exports = {
	createHash: async(psw) => {
		try {
			console.log('psw', psw);
			
			const salt = await bcrypt.genSalt(salted);
			const hash = await bcrypt.hash(psw, salt);
			return hash;
			
		} catch(err) {
			throw new HandleError({
				message: 'error creating the hash',
				code: 401
			});
		}
	},

	verifyPassword: async function(password) {
		try {
			const isValid = await bcrypt.compare(password, this.password);

			if(!isValid) {
				throw new Error('invalid credentials');
			}
			return isValid;

		} catch(err) {
			throw new HandleError({
				message: err.message || 'validation error',
				code: 401,
				success: false
			});
		}
	}
};