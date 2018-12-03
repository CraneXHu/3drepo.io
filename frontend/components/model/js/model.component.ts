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

import { dispatch, getState } from '../../../helpers/migration';
import { selectCurrentUser, CurrentUserActions } from '../../../modules/currentUser';

class ModelController implements ng.IController {

	public static $inject: string[] = [
		'$window',
		'$timeout',
		'$scope',
		'$element',
		'$location',
		'$compile',
		'$mdDialog',

		'EventService',
		'TreeService',
		'RevisionsService',
		'AuthService',
		'IssuesService',
		'RisksService',
		'StateManager',
		'PanelService',
		'ViewerService'
	];

	private issuesCardIndex;
	private risksCardIndex;
	private pointerEvents;
	private account;
	private model;
	private modelUI;
	private event;
	private branch;
	private revision;
	private settings;
	private issueId;
	private riskId;
	private treeMap;
	private selectedObjects;
	private initialSelectedObjects;

	constructor(
		private $window,
		private $timeout,
		private $scope,
		private $element,
		private $location,
		private $compile,
		private $mdDialog,

		private EventService,
		private TreeService,
		private RevisionsService,
		private AuthService,
		private IssuesService,
		private RisksService,
		private StateManager,
		private PanelService,
		private ViewerService
	) {}

	public $onInit() {
		this.issuesCardIndex = this.PanelService.getCardIndex('issues');
		this.pointerEvents = 'inherit';

		const popStateHandler = (event) => {
			this.StateManager.popStateHandler(event, this.account, this.model);
		};

		const refreshHandler = (event) => {
			return this.StateManager.refreshHandler(event);
		};

		// listen for user clicking the back button
		window.addEventListener('popstate', popStateHandler);
		window.addEventListener('beforeunload', refreshHandler);

		this.$scope.$on('$destroy', () => {
			window.removeEventListener('beforeunload', refreshHandler);
			window.removeEventListener('popstate', popStateHandler);
		});

		this.$timeout(() => {
			// Get the model element
			this.modelUI = angular.element(
				this.$element[0].querySelector('#modelUI')
			);
		});

		const username = selectCurrentUser (getState()).username;
		dispatch(CurrentUserActions.fetchUser(username));

		this.watchers();
	}

	public watchers() {

		this.$scope.$watchGroup(['vm.account', 'vm.model'], () => {
			if (this.account && this.model) {
				angular.element(() => {
					this.setupModelInfo();
				});
			}
		});

		this.$scope.$watch('vm.issueId', () => {
			if (this.issueId) {
				// timeout to make sure event is sent after issue panel card is setup
				// assume issue card shown by default
				this.$timeout(() => {
					this.IssuesService.state.displayIssue = this.issueId;
				});
			}
		});

		this.$scope.$watch('vm.riskId', () => {
			if (this.riskId) {
				// timeout to make sure event is sent after risk panel card is setup
				this.$timeout(() => {
					this.RisksService.state.displayRisk = this.riskId;
				});
			}
		});

		this.$scope.$watch(this.EventService.currentEvent, (event) => {

			this.event = event;

			if (event.type === this.EventService.EVENT.TOGGLE_ISSUE_AREA_DRAWING) {
				this.pointerEvents = event.value.on ? 'none' : 'inherit';
			}

		});

	}

	public handleModelError() {

		const message = 'The model was either not found, failed to load correctly ' +
		'or you are not authorized to view it. ' +
		' You will now be redirected to the teamspace page.';

		this.$mdDialog.show(
			this.$mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Model Error')
				.textContent(message)
				.ariaLabel('Model Error')
				.ok('OK')
		);

		this.$location.path('/dashboard/teamspaces');
	}

	public setupModelInfo() {

		this.RevisionsService.listAll(this.account, this.model);

		this.loadModelSettings().then(() => {
			if (!this.ViewerService.currentModel.model) {
				if (this.ViewerService.viewer) {
					this.ViewerService.initViewer().then(() => {
						this.loadModel();
					}).catch((err) => {
						console.error('Failed to load model: ', err);
					});
				} else {
					console.error('Failed to locate viewer');
				}
			} else {
				this.loadModel();
			}
		});
	}

	public setSelectedObjects(selectedObjects) {
		this.selectedObjects = selectedObjects;
	}

	public setInitialSelectedObjects(data) {
		this.initialSelectedObjects = data.selectedObjects;
		// Set the value to null so that it will be registered again
		this.$timeout(() => {
			this.initialSelectedObjects = null;
		});
	}

	private loadModel() {
		this.ViewerService.loadViewerModel(
			this.account,
			this.model,
			this.branch,
			this.revision
		).then( () => {
			// IMPORTANT: only load model settings after it has started loading the model
			// loadViewerModel can cancel previous model loads which will kill off old unity promises
			this.ViewerService.updateViewerSettings(this.settings);
		});
	}

	private setupViewer() {
		if (this.riskId) {
			// assume issue card shown by default
			this.PanelService.hidePanelsByType('issues');
			this.PanelService.showPanelsByType('risks');

			// timeout to make sure event is sent after risk panel card is setup
			this.$timeout(() => {
				this.RisksService.state.displayRisk = this.riskId;
			});
		}

		this.PanelService.hideSubModels(this.issuesCardIndex, !this.settings.federate);
		this.TreeService.init(this.account, this.model, this.branch, this.revision, this.settings)
			.catch((error) => {
				console.error('Error initialising tree: ', error);
			});
	}

	private loadModelSettings() {
		return this.ViewerService.getModelInfo(this.account, this.model)
			.then((response) => {
				this.settings = response.data;
				this.setupViewer();
				return Promise.resolve();
			})
			.catch((error) => {
				console.error(error);
				// If we are not logged in the
				// session expired popup takes prescedence
				if (error.data.message !== 'You are not logged in') {
					this.handleModelError();
				}

				return Promise.reject(error);
			});
	}
}

export const ModelComponent: ng.IComponentOptions = {
	bindings: {
		account:  '=',
		branch:   '=',
		issueId: '=',
		riskId: '=',
		model:  '=',
		revision: '=',
		state:    '=',
		isLiteMode: '='
	},
	controller: ModelController,
	controllerAs: 'vm',
	templateUrl: 'templates/model.html'
};

export const ModelComponentModule = angular
	.module('3drepo')
	.component('model', ModelComponent);
