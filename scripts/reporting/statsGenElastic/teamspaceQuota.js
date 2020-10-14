/**
*	Copyright (C) 2019 3D Repo Ltd
*
*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU Affero General Public License as
*	published by the Free Software Foundation, either version 3 of the
*	License, or (at your option) any later version.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU Affero General Public License for more details.
*
*	You should have received a copy of the GNU Affero General Public License
*	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'
const fs = require('fs');
const Utils = require('./utils');

const getNumUsers = async (col, user) => {
	const nUsers = await col.find({'roles.db': user.user}).count();
	user.numUsers = nUsers;

	return user;
}


const writeQuotaDetails = async(dbConn, col, ElasticClient, enterprise) => {
	const type = enterprise? 'enterprise' : 'discretionary';
	const now = Date.now();

	const query = enterprise?
		{'customData.billing.subscriptions.enterprise': {'$exists' : true}} :
		{'customData.billing.subscriptions.discretionary': {'$exists' : true}};

	const sort = enterprise?
		{'customData.billing.subscriptions.enterprise.expiryDate' : -1} :
		{'customData.billing.subscriptions.discretionary.expiryDate' : -1};

	const ts = await col.find(query, {'customData.billing.subscriptions' : 1, 'user' : 1})
		.sort(sort).toArray();

	const licensedTS = [];
	const promises = [];
	ts.forEach((user) => {
		promises.push(getNumUsers(col, user));
		const sub = enterprise? user.customData.billing.subscriptions.enterprise :
			user.customData.billing.subscriptions.discretionary;
	});

	const res = await Promise.all(promises);

	res.forEach((user) => {
		const sub = enterprise? user.customData.billing.subscriptions.enterprise :  user.customData.billing.subscriptions.discretionary;
		const expired = sub.expiryDate && sub.expiryDate < now;
		const dateString = sub.expiryDate ? Utils.formatDate(sub.expiryDate) : '';
		//	stream.write('Teamspace,type,No. Users,Max Users,Max Data(GB),Expiry Date, expired?\n');
		// stream.write(`${user.user},${type},${user.numUsers},${sub.collaborators},${sub.data/1024},${dateString},${expired? 'Yes' : ''}\n`);
		const elasticBody =  {
			"Teamspace" : user.user,
			"Type" : type, 
			"User Count" : user.numUsers, 
			"Max Users" : sub.collaborators, 
			"Max Data(GB)" : sub.data/1024, 
			"Expiry Date" : dateString, 
			"expired" : expired? 'Yes' : '', 
		}
		Utils.createElasticRecord(ElasticClient, Utils.teamspaceIndexPrefix, user, elasticBody)
		
		!expired && licensedTS.push({teamspace: user.user, type});

	});

	return licensedTS;
}


const reportTeamspaceQuota = async (dbConn, ElasticClient) => {
	const col = await dbConn.db('admin').collection('system.users');
	// stream.write('Licenced Teamspaces Quota information\n');
	// stream.write('Teamspace,type,No. Users,Max Users,Max Data(GB),Expiry Date, expired?\n');
	console.log ("[QUOTA] Writing Licenced Teamspaces Quota information")
	const enterpriseTS = await writeQuotaDetails(dbConn, col, ElasticClient, true);
	const discretionaryTS = await writeQuotaDetails(dbConn, col, ElasticClient, false);
	return [...enterpriseTS, ...discretionaryTS];
}

const TS = {};

TS.createTeamspaceReport = (dbConn, ElasticClient) =>{
	return new Promise((resolve, reject) => {
		reportTeamspaceQuota(dbConn, ElasticClient).then((ts) => {
			console.log('[DB] Generated Teamspace Report');
			resolve({teamspaces: ts});

		}).catch((err) => {
			reject(err);
		});
	});
}

module.exports = TS;

