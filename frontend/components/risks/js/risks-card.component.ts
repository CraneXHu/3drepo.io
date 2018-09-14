/**
 *	Copyright (C) 2018 3D Repo Ltd
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
import { AuthService } from "../../home/js/auth.service";
import { DialogService } from "../../home/js/dialog.service";
import { EventService } from "../../home/js/event.service";
import { NotificationService } from "../../notifications/js/notification.service";
import { RevisionsService } from "../../revisions/js/revisions.service";
import { RisksService } from "./risks.service";
import { ViewerService } from "../../viewer/js/viewer.service";

enum RisksCardState {
	ShowRisksList,
	ShowRiskItem
}

class RisksCardController implements ng.IController {

	public static $inject: string[] = [
		"$scope",
		"$timeout",
		"$state",
		"$q",

		"RisksService",
		"EventService",
		"AuthService",
		"NotificationService",
		"RevisionsService",
		"ClientConfigService",
		"DialogService",
		"ViewerService"
	];

	private account: string;
	private model: string;
	private revision: string;
	private revisions: any;
	private modelSettings: any;
	private subModels: any;
	private availableJobs: any;

	private toShow: RisksCardState;
	private showAddAlert: boolean;
	private canAddRisk: boolean;
	private showProgress: boolean;
	private progressInfo: string;
	private onContentHeightRequest: any;
	private addAlertText: string;

	private risksToShow: any[];
	private allRisks: any[];
	private selectedRisk: any;

	private title: string;

	private modelUserJob: any;
	private savingRisk: boolean;
	private revisionsStatus: any;
	private risksReady: any;
	private onShowItem: any;
	private hideItem: boolean;

	constructor(
		private $scope,
		private $timeout,
		private $state,
		private $q,

		private risksService: RisksService,
		private eventService: EventService,
		private authService: AuthService,
		private notificationService: NotificationService,
		private revisionsService: RevisionsService,
		private clientConfigService: any,
		private dialogService: DialogService,
		private viewerService: ViewerService
	) {}

	public $onInit() {

		this.risksService.reset();

		this.showProgress = true;
		this.progressInfo = "Loading risks";
		this.onContentHeightRequest({height: 70}); // To show the loading progress
		this.savingRisk = false;
		this.revisionsStatus = this.revisionsService.status;

		// Get the user roles for the model
		this.risksReady = this.risksService.getRisksAndJobs(this.account, this.model, this.revision)
			.then(() => {
				this.$timeout(() => {
					this.toShow = RisksCardState.ShowRisksList;
					this.showProgress = false;
				}, 1000);
			})
			.catch((error) => {
				const content = "Failed to retrieve risks and jobs for this model. " +
					"If this continues, please message support@3drepo.org.";
				const escapable = true;
				this.dialogService.text("Error getting risks and jobs", content, escapable);
				console.error(error);
			});

		this.watchers();

	}

	public $onDestroy() {

		this.risksService.reset();

		let channel = this.notificationService.getChannel(this.account, this.model);

		channel.risks.unsubscribeFromCreated(this.onRiskCreated);
		channel.risks.unsubscribeFromUpdated(this.risksService.updateRisks);

		// Do the same for all subModels
		([] || this.subModels).forEach((subModel) => {
				channel =  this.notificationService.getChannel(subModel.database, subModel.model);
				channel.risks.unsubscribeFromCreated(this.onRiskCreated);
				channel.risks.unsubscribeFromUpdated(this.risksService.updateRisks);
		});

	}

	public watchers() {

		this.$scope.$watch("vm.modelSettings", () => {
			if (this.modelSettings) {

				this.risksReady.then(() => {
					this.canAddRisk = this.authService.hasPermission(
						this.clientConfigService.permissions.PERM_CREATE_ISSUE,
						this.modelSettings.permissions
					);
				});

				this.subModels = this.modelSettings.subModels || [];
				this.watchNotification();

			}
		});

		this.$scope.$watch(() => {
			return this.revisionsService.status.data;
		}, () => {
			if (this.revisionsService.status.data) {
				this.revisions = this.revisionsService.status.data[this.account + ":" + this.model];
			}
		}, true);

		this.$scope.$watch(() => {
			return this.risksService.state;
		}, (state) => {

			if (state) {
				angular.extend(this, state);
			}

		}, true);

		/**
		 * Set up event watching
		 */
		this.$scope.$watch(this.eventService.currentEvent, (event) => {

			// TODO Need to listen to a new type of event for Risks
			if (event.type === this.eventService.EVENT.VIEWER.CLICK_PIN) {
				for (let i = 0; i < this.allRisks.length; i++) {
					if (this.allRisks[i]._id === event.value.id) {
						this.editRisk(this.allRisks[i]);
						break;
					}
				}
			}

		});

		/*
		 * Go back to risks list
		 */
		this.$scope.$watch("vm.hideItem", (newValue) => {
			if (angular.isDefined(newValue) && newValue) {
				this.toShow = RisksCardState.ShowRisksList;
				let risksListItemId;

				if (this.risksService.state.selectedRisk && this.risksService.state.selectedRisk._id) {
					risksListItemId = "risk" + this.risksService.state.selectedRisk._id;
				}

				this.$state.go("home.account.model",
					{
						account: this.account,
						model: this.model,
						revision: this.revision,
						noSet: true
					},
					{notify: false}
				).then(() => {
					const element = document.getElementById(risksListItemId);
					if (element && element.scrollIntoView) {
						element.scrollIntoView();
					}
				});

			}
		});

	}

	/**
	 * Returns true if model loaded.
	 */
	public modelLoaded() {
		return this.risksService.modelLoaded();
	}

	/**
	 * Close the add alert
	 */
	public closeAddAlert() {
		this.showAddAlert = false;
		this.addAlertText = "";
	}

	/**
	 * Set the content height
	 */
	public setContentHeight(height) {
		this.onContentHeightRequest({height});
	}

	public watchNotification() {
		// Watch for new risks

		let channel = this.notificationService.getChannel(this.account, this.model);

		channel.risks.subscribeToCreated(this.onRiskCreated, this);
		channel.risks.subscribeToUpdated(this.risksService.updateRisks, this.risksService);

		// Do the same for all subModels
		(this.subModels || []).forEach((subModel) => {
				channel =  this.notificationService.getChannel(subModel.database, subModel.model);
				channel.risks.subscribeToCreated(this.onRiskCreated, this);
				channel.risks.subscribeToUpdated(this.risksService.updateRisks, this.risksService);
		});
	}

	public onRiskCreated(risks) {
		// TODO: fix submodel part;

		risks.forEach((risk) => {
			this.shouldShowRisk(risk);
		});

	}

	public shouldShowRisk(risk) {

		if (risk) {
			const isSubmodelRisk = (this.model !== risk.model);
			let riskShouldAdd = false;

			if (this.revisions && this.revisions.length) {

				let currentRevision;

				// this.revision will be null if on head revision
				// as it is not set via the URL state
				if (!this.revision) {
					currentRevision = this.revisions[0]; // Set it to the top revision
				} else {
					currentRevision = this.revisions.find((rev) => {
						return rev._id === this.revision || rev.tag === this.revision;
					});
				}

				// If Federation
				riskShouldAdd = isSubmodelRisk || this.checkRiskShouldAdd(risk, currentRevision, this.revisions);
				if (riskShouldAdd) {
					this.risksService.addRisk(risk);
				}
			}
		} else {
			console.error("Risk is undefined/null: ", risk);
		}

	}

	public checkRiskShouldAdd(risk, currentRevision, revisions) {
		// Searches for the full revision object in the revisions of the model
		const riskRevision = revisions.find((rev) => {
			return rev._id === risk.rev_id;
		});

		if (!riskRevision || !currentRevision) {
			console.error("Risk revision or current revision are not set: ", riskRevision, currentRevision);
			return true;
		}

		// Checks that the revision of the issue is the same as the model's current revision or that is a previous revision.
		const riskInDate = new Date(riskRevision.timestamp) <= new Date(currentRevision.timestamp);
		return riskRevision && riskInDate;

	}

	/**
	 * Set up editing risk
	 * @param risk
	 */
	public editRisk(risk) {

		if (this.risksService.state.selectedRisk) {
			this.risksService.deselectPin(this.risksService.state.selectedRisk);
		}

		if (risk) {

			this.viewerService.highlightObjects([]);
			// TODO Change state to risk
			/*this.$state.go("home.account.model.risk",
				{
					account: this.account,
					model: this.model,
					revision: this.revision,
					risk: risk._id,
					noSet: true
				},
				{notify: false}
			);*/

			this.risksService.setSelectedRisk(risk, true, this.revision);

		} else {
			this.risksService.resetSelectedRisk();
		}

		this.toShow = RisksCardState.ShowRiskItem;
		this.onShowItem();

	}

	/**
	 * Exit risk editing
	 * @param risk
	 */
	public editRiskExit(risk) {
		document.getElementById("risk" + risk._id).scrollIntoView();
		this.hideItem = true;
	}

	/**
	 * Returns true if risks card state is show risks list.
	 */
	public showRisksList() {
		return this.toShow === RisksCardState.ShowRisksList;
	}

	/**
	 * Returns true if risks card state is show risk item.
	 */
	public showRiskItem() {
		return this.toShow === RisksCardState.ShowRiskItem;
	}

	/**
	 * Deletes currently selected risk.
	 */
	public deleteSelectedRisk() {
		console.debug("delSelRisks");
	}
}

export const RisksCardComponent: ng.IComponentOptions = {
	bindings: {
		account: "=",
		model: "=",
		branch:  "=",
		revision: "=",
		filterText: "=",
		modelSettings: "=",
		show: "=",
		showAdd: "=",
		selectedMenuOption: "=",
		onContentHeightRequest: "&",
		onShowItem : "&",
		hideItem: "=",
		selectedObjects: "=",
		setInitialSelectedObjects: "&"
	},
	controller: RisksCardController,
	controllerAs: "vm",
	templateUrl: "templates/risks-card.html"
};

export const RisksCardComponentModule = angular
	.module("3drepo")
	.component("risksCard", RisksCardComponent);
