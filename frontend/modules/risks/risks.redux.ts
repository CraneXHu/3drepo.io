/**
 *  Copyright (C) 2020 3D Repo Ltd
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

import { cloneDeep, keyBy } from 'lodash';
import { createActions, createReducer } from 'reduxsauce';

export const { Types: RisksTypes, Creators: RisksActions } = createActions({
	fetchRisks: ['teamspace', 'modelId', 'revision'],
	fetchRisksSuccess: ['risks'],
	fetchRisk: ['teamspace', 'modelId', 'riskId'],
	fetchRiskSuccess: ['risk'],
	fetchRiskFailure: [],
	setComponentState: ['componentState'],
	saveRisk: ['teamspace', 'model', 'riskData', 'revision', 'finishSubmitting', 'ignoreViewer'],
	updateRisk: ['teamspace', 'modelId', 'riskData'],
	updateBoardRisk: ['teamspace', 'modelId', 'riskData'],
	cloneRisk: ['dialogId'],
	postComment: ['teamspace', 'modelId', 'riskData', 'ignoreViewer', 'finishSubmitting'],
	removeComment: ['teamspace', 'modelId', 'riskData'],
	saveRiskSuccess: ['risk'],
	setNewRisk: [],
	printRisks: ['teamspace', 'modelId'],
	downloadRisks: ['teamspace', 'modelId'],
	goToRisk: ['risk'],
	showDetails: ['revision', 'riskId'],
	closeDetails: [],
	setActiveRisk: ['risk', 'revision', 'ignoreViewer'],
	togglePendingState: ['isPending'],
	toggleDetailsPendingState: ['isPending'],
	togglePostCommentPendingState: ['isPending'],
	subscribeOnRiskChanges: ['teamspace', 'modelId'],
	unsubscribeOnRiskChanges: ['teamspace', 'modelId'],
	toggleShowPins: ['showPins'],
	subscribeOnRiskCommentsChanges: ['teamspace', 'modelId', 'riskId'],
	unsubscribeOnRiskCommentsChanges: ['teamspace', 'modelId', 'riskId'],
	createCommentSuccess: ['comment', 'riskId'],
	deleteCommentSuccess: ['commentGuid', 'riskId'],
	updateCommentSuccess: ['comment', 'riskId'],
	toggleSortOrder: ['sortOrder'],
	updateNewRisk: ['newRisk'],
	setFilters: ['filters'],
	showCloseInfo: ['riskId'],
	hideCloseInfo: ['riskId'],
	updateSelectedRiskPin: ['position'],
	removeResource: ['resource'],
	removeResourceSuccess: ['resource', 'riskId'],
	attachFileResources: ['files'],
	attachLinkResources: ['links'],
	attachResourcesSuccess: ['resources', 'riskId'],
	updateResourcesSuccess: ['resourcesIds', 'updates', 'riskId' ],
	fetchMitigationCriteria: ['teamspace'],
	fetchMitigationCriteriaSuccess: ['criteria', 'teamspace'],
	fetchMitigationCriteriaFailure: [],
	showMitigationSuggestions: ['conditions', 'setFieldValue'],
	updateActiveRiskViewpoint: ['screenshot'],
	reset: []
}, { prefix: 'RISKS/' });

export interface IRisksComponentState {
	showPins: boolean;
	activeRisk: any;
	showDetails: boolean;
	expandDetails: boolean;
	newRisk: any;
	newComment: any;
	selectedFilters: any[];
	associatedActivities: any[];
}

export interface IRisksState {
	risksMap: any;
	isPending: boolean;
	componentState: IRisksComponentState;
}

export const INITIAL_STATE = {
	risksMap: {},
	isPending: true,
	componentState: {
		activeRisk: null,
		showDetails: false,
		expandDetails: true,
		newRisk: {},
		newComment: {},
		selectedFilters: [],
		filteredRisks: [],
		showPins: true,
		fetchingDetailsIsPending: false,
		postCommentIsPending: false,
		associatedActivities: [],
		sortOrder: 'desc',
		failedToLoad: false
	},
	mitigationCriteria: {},
};

const updateRiskProps = (risksMap, riskId, props = {}) => {
	return {
		...risksMap,
		[riskId]: {
			...risksMap[riskId],
			...props
		}
	};
};

export const togglePendingState = (state = INITIAL_STATE, { isPending }) => ({ ...state, isPending });

export const toggleDetailsPendingState = (state = INITIAL_STATE, { isPending }) => {
	return setComponentState(state, { componentState: { fetchingDetailsIsPending: isPending } });
};

export const togglePostCommentPendingState = (state = INITIAL_STATE, { isPending }) => {
	return setComponentState(state, { componentState: { postCommentIsPending: isPending } });
};

export const fetchRisksSuccess = (state = INITIAL_STATE, { risks = [] }) => {
	const risksMap = keyBy(risks, '_id');

	const associatedActivities = risks.reduce((activities, risk) => {
		if (risk.associated_activity && !activities.includes(risk.associated_activity)) {
			activities.push(risk.associated_activity);
		}
		return activities;
	}, []);

	return {
		...state, risksMap, associatedActivities, componentState: { ...INITIAL_STATE.componentState }
	};
};

export const fetchRiskSuccess = (state = INITIAL_STATE,  {risk: {_id, comments, resources}}) => {
	const risksMap = updateRiskProps(state.risksMap, _id, { comments, resources });

	return { ...state, risksMap, componentState: { ...state.componentState, failedToLoad: false } };
};

export const fetchRiskFailure = (state = INITIAL_STATE) => {
	return { ...state, componentState: { ...state.componentState, failedToLoad: true } };
};

export const saveRiskSuccess = (state = INITIAL_STATE, { risk }) => {
	const risksMap = updateRiskProps(state.risksMap, risk._id, risk);

	return {
		...state,
		risksMap,
		componentState: { ...state.componentState, newRisk: {}}
	};
};

export const updateSelectedRiskPin =  (state = INITIAL_STATE, { position }) => {
	if (state.componentState.activeRisk) {
		const risk = state.risksMap[state.componentState.activeRisk];
		return saveRiskSuccess(state, { risk: {...risk, position} });
	}

	if (state.componentState.newRisk) {
		const componentState = state.componentState;

		return {...state,
			componentState: { ...componentState , newRisk: { ...componentState.newRisk, position } }
		};
	}

	return state;
};

export const setComponentState = (state = INITIAL_STATE, { componentState = {} }) => {
	return { ...state, componentState: { ...state.componentState, ...componentState } };
};

export const createCommentSuccess = (state = INITIAL_STATE, { comment, riskId }) => {
	let comments;

	if (comment.action || comment.viewpoint) {
		comments = [comment, ...state.risksMap[riskId].comments.map((log) => ({ ...log, sealed: true, new: true }))];
	} else {
		comments = [...state.risksMap[riskId].comments.map((log) => ({ ...log, sealed: true, new: true }))];
	}

	const risksMap = updateRiskProps(state.risksMap, riskId, { comments });

	return { ...state, risksMap };
};

export const updateCommentSuccess = (state = INITIAL_STATE, { comment, riskId }) => {
	const risksMap = cloneDeep(state.risksMap);
	const commentIndex = risksMap[riskId].comments.findIndex((log) => log.guid === comment.guid);
	risksMap[riskId].comments[commentIndex] = comment;

	return { ...state, risksMap };
};

export const deleteCommentSuccess = (state = INITIAL_STATE, { commentGuid, riskId }) => {
	const comments = state.risksMap[riskId].comments.filter((log) => log.guid !== commentGuid);
	const risksMap = updateRiskProps(state.risksMap, riskId, { comments });

	return { ...state, risksMap };
};

export const toggleSortOrder = (state = INITIAL_STATE) => {
	return {
		...state, componentState: {
			...state.componentState,
			sortOrder: state.componentState.sortOrder === 'asc' ? 'desc' : 'asc'
		}
	};
};

const showCloseInfo = (state = INITIAL_STATE, { riskId }) => {
	const risksMap = updateRiskProps(state.risksMap, riskId, { willBeClosed: true });
	return { ...state, risksMap };
};

const hideCloseInfo = (state = INITIAL_STATE, { riskId }) => {
	const risksMap = updateRiskProps(state.risksMap, riskId, { willBeClosed: false });
	return { ...state, risksMap };
};

const toggleShowPins = (state = INITIAL_STATE, { showPins }) => {
	return setComponentState(state, { componentState: {showPins} });
};

const removeResourceSuccess =  (state = INITIAL_STATE, { resource, riskId }) => {
	const resources = state.risksMap[riskId].resources.filter((r) => r._id !== resource._id);
	const risksMap = updateRiskProps(state.risksMap, riskId, { resources });

	return { ...state, risksMap };
};

const attachResourcesSuccess = (state = INITIAL_STATE, { resources, riskId }) => {
	resources = resources.concat(state.risksMap[riskId].resources || []);
	const risksMap = updateRiskProps(state.risksMap, riskId, { resources });
	return { ...state, risksMap};
};

const updateResourcesSuccess = (state = INITIAL_STATE, { resourcesIds, updates, riskId }) => {
	const resources = state.risksMap[riskId].resources.map((resource) => {
		const updateIndex = resourcesIds.indexOf(resource._id);

		if (updateIndex >= 0) {
			return {...resource, ...updates[updateIndex]};
		} else {
			return resource;
		}
	});

	const risksMap = updateRiskProps(state.risksMap, riskId, { resources });
	return { ...state, risksMap};
};

export const fetchMitigationCriteriaSuccess = (state = INITIAL_STATE,  { criteria, teamspace }) => {
	return { ...state, mitigationCriteria: { ...criteria, teamspace } };
};

const reset = () => cloneDeep(INITIAL_STATE);

export const reducer = createReducer(INITIAL_STATE, {
	[RisksTypes.FETCH_RISKS_SUCCESS]: fetchRisksSuccess,
	[RisksTypes.FETCH_RISK_SUCCESS]: fetchRiskSuccess,
	[RisksTypes.FETCH_RISK_FAILURE]: fetchRiskFailure,
	[RisksTypes.SET_COMPONENT_STATE]: setComponentState,
	[RisksTypes.SAVE_RISK_SUCCESS]: saveRiskSuccess,
	[RisksTypes.TOGGLE_PENDING_STATE]: togglePendingState,
	[RisksTypes.TOGGLE_DETAILS_PENDING_STATE]: toggleDetailsPendingState,
	[RisksTypes.TOGGLE_POST_COMMENT_PENDING_STATE]: togglePostCommentPendingState,
	[RisksTypes.CREATE_COMMENT_SUCCESS]: createCommentSuccess,
	[RisksTypes.UPDATE_COMMENT_SUCCESS]: updateCommentSuccess,
	[RisksTypes.DELETE_COMMENT_SUCCESS]: deleteCommentSuccess,
	[RisksTypes.TOGGLE_SORT_ORDER]: toggleSortOrder,
	[RisksTypes.SHOW_CLOSE_INFO]: showCloseInfo,
	[RisksTypes.HIDE_CLOSE_INFO]: hideCloseInfo,
	[RisksTypes.UPDATE_SELECTED_RISK_PIN]: updateSelectedRiskPin,
	[RisksTypes.REMOVE_RESOURCE_SUCCESS]: removeResourceSuccess,
	[RisksTypes.ATTACH_RESOURCES_SUCCESS]: attachResourcesSuccess,
	[RisksTypes.UPDATE_RESOURCES_SUCCESS]: updateResourcesSuccess,
	[RisksTypes.TOGGLE_SHOW_PINS]: toggleShowPins,
	[RisksTypes.FETCH_MITIGATION_CRITERIA_SUCCESS]: fetchMitigationCriteriaSuccess,
	[RisksTypes.FETCH_MITIGATION_CRITERIA_FAILURE]: fetchRiskFailure,
	[RisksTypes.RESET]: reset,
});
