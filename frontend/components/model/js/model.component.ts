/**
 *	Copyright (C) 2014 3D Repo Ltd
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

import { dispatch, getState, subscribe } from '../../../helpers/migration';
import { selectCurrentUser, CurrentUserActions } from '../../../modules/currentUser';
import { selectRisksMap } from '../../../modules/risks';
import { selectIssuesMap } from '../../../modules/issues';
import { ModelActions, selectSettings, selectIsPending } from '../../../modules/model';
import { TreeActions } from '../../../modules/tree';
import { ViewpointsActions } from '../../../modules/viewpoints';
import { JobsActions } from '../../../modules/jobs';
import { RisksActions } from '../../../modules/risks';
import { GroupsActions } from '../../../modules/groups';
import { VIEWER_EVENTS } from '../../../constants/viewer';
import { StarredMetaActions } from '../../../modules/starredMeta';
import { BimActions } from '../../../modules/bim';
import { IssuesActions } from '../../../modules/issues';
import { CompareActions } from '../../../modules/compare';
import { ViewerActions } from '../../../modules/viewer';

class ModelController implements ng.IController {

	public static $inject: string[] = [
		'$timeout',
		'$scope',
		'$element',
		'$location',
		'$mdDialog',

		'StateManager',
		'ViewerService'
	];

	private issuesCardIndex;
	private pointerEvents;
	private account;
	private model;
	private modelUI;
	private event;
	private branch;
	private revision;
	private settings: any = {};
	private issueId;
	private riskId;
	private treeMap;
	private selectedObjects;
	private initialSelectedObjects;
	private isPending = false;
	private modelSettingsLoaded = false;
	private unsubscribeModelSettingsListener;

	constructor(
		private $timeout,
		private $scope,
		private $element,
		private $location,
		private $mdDialog,

		private StateManager,
		private ViewerService
	) {
	}


	public $onInit() {
		this.pointerEvents = 'inherit';

		const popStateHandler = (event) => {
			this.StateManager.popStateHandler(event, this.account, this.model);
		};

		const refreshHandler = (event) => {
			return this.StateManager.refreshHandler(event);
		};

		// listen for user clicking the back button
		window.addEventListener('popstate', popStateHandler);

		this.$scope.$on('$destroy', () => {
			this.unsubscribeModelSettingsListener();
			this.modelSettingsLoaded = false;
			this.settings = {};
			this.isPending = false;
			window.removeEventListener('beforeunload', refreshHandler);
			window.removeEventListener('popstate', popStateHandler);
			this.ViewerService.off(VIEWER_EVENTS.CLICK_PIN);
			this.ViewerService.off(VIEWER_EVENTS.CHANGE_PIN_COLOUR);
			this.ViewerService.off(VIEWER_EVENTS.SET_CAMERA);
			this.ViewerService.off(VIEWER_EVENTS.BACKGROUND_SELECTED_PIN_MODE);
		});

		this.ViewerService.on(VIEWER_EVENTS.CLICK_PIN, this.onPinClick);
		this.ViewerService.on(VIEWER_EVENTS.CHANGE_PIN_COLOUR, this.onChangePinColor);
		this.ViewerService.on(VIEWER_EVENTS.SET_CAMERA, this.onSetCamera);
		this.ViewerService.on(VIEWER_EVENTS.BACKGROUND_SELECTED_PIN_MODE, this.onBackgroundSelectedPinMode);
	}

	public onPinClick = ({ id }) => {
		const currentState = getState();
		const risksMap = selectRisksMap(currentState);
		const issuesMap = selectIssuesMap(currentState);

		if (risksMap[id]) {
			dispatch(RisksActions.showDetails(this.account, this.model, this.revision, risksMap[id]));
		}

		if (issuesMap[id]) {
			dispatch(IssuesActions.showDetails(this.account, this.model, this.revision, issuesMap[id]));
		}
	}

	public onChangePinColor = (params) => {
		dispatch(ViewerActions.changePinColor(params));
	}

	public onSetCamera = (params) => {
		dispatch(ViewerActions.setCamera(params));
	}

	public onBackgroundSelectedPinMode = () => {
		dispatch(ViewerActions.removeUnsavedPin());
	}
}
