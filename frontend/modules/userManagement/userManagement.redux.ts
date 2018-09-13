/**
 *  Copyright (C) 2017 3D Repo Ltd
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createActions, createReducer } from 'reduxsauce';
import { TEAMSPACE_PERMISSIONS } from '../../constants/teamspace-permissions';

export const { Types: UserManagementTypes, Creators: UserManagementActions } = createActions({
	fetchTeamspaceDetails: ['teamspace'],
	fetchTeamspaceDetailsSuccess: ['teamspace', 'users', 'quotaInfo', 'jobs', 'jobsColors'],
	setPendingState: ['isPending'],
	addUser: ['user'],
	addUserSuccess: ['user'],
	removeUser: ['username'],
	removeUserSuccess: ['username'],
	removeUserFailure: [],
	setTeamspace: ['teamspace']
}, { prefix: 'USER_MANAGEMENT_' });

export const INITIAL_STATE = {
	teamspace: null,
	users: [],
	jobs: [],
	jobsColors: [],
	projects: [],
	collaboratorLimit: null,
	isPending: false
};

/**
 * Add additional fields to user data
 * @param users
 * @returns
 */
const prepareUserData = (teamspaceName, users): object => {
	return {
		...users,
		isAdmin: users.permissions.includes(TEAMSPACE_PERMISSIONS.admin.key),
		isOwner: teamspaceName === users.user
	};
};

export const fetchTeamspaceDetailsSuccess = (state = INITIAL_STATE, action) => {
	const { teamspace, quotaInfo = {}, jobs, jobsColors } = action;
	const users = action.users.map(prepareUserData.bind(null, teamspace));

	return { ...state, ...quotaInfo, teamspace, users, jobs, jobsColors, isPending: false };
};

export const setPendingState = (state = INITIAL_STATE, { isPending }) => {
	return { ...state, isPending};
};

export const addUserSuccess = (state = INITIAL_STATE, { user }) => {
	const users = [
		...state.users,
		prepareUserData(state.teamspace, user)
	];
	return { ...state, users };
};

export const removeUserSuccess = (state = INITIAL_STATE, { username }) => {
	const users = state.users.filter(({user}) => {
		return user !== username;
	});
	return { ...state, users };
};

export const removeUserFailure = (state = INITIAL_STATE, action) => {
	return state;
};

export const setTeamspace = (state = INITIAL_STATE, { teamspace }) => {
	return { ...state, teamspace };
};

export const reducer = createReducer(INITIAL_STATE, {
	[UserManagementTypes.FETCH_TEAMSPACE_DETAILS_SUCCESS]: fetchTeamspaceDetailsSuccess,
	[UserManagementTypes.SET_PENDING_STATE]: setPendingState,
	[UserManagementTypes.ADD_USER_SUCCESS]: addUserSuccess,
	[UserManagementTypes.REMOVE_USER_SUCCESS]: removeUserSuccess,
	[UserManagementTypes.REMOVE_USER_FAILURE]: removeUserFailure,
	[UserManagementTypes.SET_TEAMSPACE]: setTeamspace
});
