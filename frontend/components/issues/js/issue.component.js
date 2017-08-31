/**
 *	Copyright (C) 2016 3D Repo Ltd
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the issueComp of the GNU Affero General Public License as
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

(function () {
	"use strict";

	angular.module("3drepo")
		.component("issue", {
			controller: IssueCtrl,
			controllerAs: "vm",
			templateUrl: "templates/issue.html",
			bindings: {
				account: "<",
				model: "<",
				revision: "<",
				data: "<",
				keysDown: "<",
				exit: "&",
				event: "<",
				selectedIssueLoaded: "<",
				issueCreated: "&",
				contentHeight: "&",
				selectedObjects: "<",
				modelSettings: "<",
				setInitialSelectedObjects: "&",
				userJob: "<",
				availableJobs: "<"
			}
		});

	IssueCtrl.$inject = [
		"$location", "$q", "$mdDialog", "$element", "EventService", 
		"IssuesService", "UtilsService", "NotificationService", "AuthService", 
		"$timeout", "$scope", "ClientConfigService", "AnalyticService", 
		"$state", "StateManager"
	];

	function IssueCtrl (
		$location, $q, $mdDialog, $element, EventService, IssuesService,
		UtilsService, NotificationService, AuthService, $timeout,
		$scope, ClientConfigService, AnalyticService, $state, StateManager
	) {
		
		var vm = this;

		/*
		 * Init
		 */
		vm.$onInit = function() { 

			vm.savedScreenShot = null;
			vm.editingCommentIndex = null;
			vm.commentViewpoint;
			vm.aboutToBeDestroyed = false;
			vm.savedDescription;
			vm.savedComment;

			vm.reasonCommentText = "Comment requires text";
			vm.reasonTitleText = "Issue requires name";

			if (vm.data) {
				vm.disabledReason = vm.reasonCommentText;
			} else {
				vm.disabledReason = vm.reasonTitleText;
			}
			
			vm.issueProgressInfo = "Loading Issue...";
			vm.textInputHasFocusFlag = false;
			vm.hideDescription = false;
			vm.submitDisabled = true;
			vm.pinDisabled = true;
			vm.pinData = null;
			vm.showAdditional = true;
			vm.editingDescription = false;
			vm.clearPin = false;

			// TODO: this is bad, just use ng directives
			var issueRole = $element[0].querySelector("#issueRoleIndicator");
			vm.issueRoleIndicator = angular.element(issueRole);

			vm.priorities = [
				{value: "none", label: "None"},
				{value: "low", label: "Low"},
				{value: "medium", label: "Medium"},
				{value: "high", label: "High"}
			];
			vm.statuses = [
				{value: "open", label: "Open"},
				{value: "in progress", label: "In progress"},
				{value: "for approval", label: "For approval"},
				{value: "closed", label: "Closed"}
			];

			vm.actions = {
				screen_shot: {
					icon: "camera_alt", 
					label: "Screen shot", 
					disabled: function() { 
						if (!vm.data) {
							return vm.submitDisabled;
						} else {
							return false;
						}
					}, 
					visible: function() { 
						return true; 
					},
					selected: false
				},
				pin: {
					icon: "place", 
					label: "Pin", 
					disabled: function() { 
						return vm.submitDisabled || vm.pinHidden;
					},
					visible: function() { 
						return !vm.data;
					},
					selected: false
				}
			};

			vm.notificationStarted = false;

			vm.setContentHeight();
			history.pushState(null, null, document.URL);

			var popStateHandler = function(event) {
				StateManager.popStateHandler(event, vm.account, vm.model);
			};

			var refreshHandler = function (event) {
				return StateManager.refreshHandler(event); 
			};

			//listen for user clicking the back button
			window.addEventListener("popstate", popStateHandler);
			window.addEventListener("beforeunload", refreshHandler);
			
			$scope.$on("$destroy", function(){
				window.removeEventListener("beforeunload", refreshHandler);
				window.removeEventListener("popstate", popStateHandler);
			});

		};

		vm.getPlaceholderText = function() {
			if (vm.canComment) {
				return "Write a new comment";
			} else if (vm.issueData.status === "closed") {
				return "You cannot comment on a closed issue";
			} else {
				return "You do not have permission to leave comments";
			}
		};

	
		vm.convertCommentTopicType = function() {
			if (vm.issueData && vm.issueData.comments) {
				vm.issueData.comments.forEach(function(comment){
					if(comment.action && comment.action.property === "topic_type"){
						IssuesService.convertActionCommentToText(comment, vm.topic_types);
					}
				});
			}
		};
			

		vm.setCanUpdateStatus = function(issueData) {

			if(!AuthService.hasPermission(ClientConfigService.permissions.PERM_CREATE_ISSUE, vm.modelSettings.permissions)){
				return vm.canUpdateStatus = false;
			}

			var isOwner = (AuthService.getUsername() === issueData.owner);
			var hasRole = issueData.assigned_roles.indexOf(vm.userJob._id) !== -1;
			vm.canUpdateStatus = isOwner || hasRole;

		};

		$scope.$watch("vm.modelSettings", function() {
			if(vm.modelSettings){
				vm.topic_types = vm.modelSettings.properties && vm.modelSettings.properties.topicTypes || [];
				vm.canComment = AuthService.hasPermission(ClientConfigService.permissions.PERM_COMMENT_ISSUE, vm.modelSettings.permissions);
				//convert comment topic_types
				vm.convertCommentTopicType();
			}
		});

		$scope.$watch("vm.availableJobs", function() {
			// Role
			if (vm.availableJobs) {
				vm.modelJobs = vm.availableJobs.map(function (availableJob) {
					/*
					// Get the actual role and return the last part of it
					return availableRole.role.substring(availableRole.role.lastIndexOf(".") + 1);
					*/
					return availableJob._id;
				});
			}
		});


		$scope.$watchGroup(["vm.data", "vm.statuses"], function() {

			// Data
			
			if (vm.data && vm.statuses && vm.statuses.length) {

				startNotification();
				var disableStatus;

				// Set up statuses
				disableStatus = !userHasCreatorRole() && !userHasAdminRole() && !(AuthService.getUsername() === vm.data.owner);
				vm.statuses[0].disabled = disableStatus;
				vm.statuses[3].disabled = disableStatus;

				vm.issueData = angular.copy(vm.data);
			
				vm.issueData.comments = vm.issueData.comments || [];
				vm.issueData.name = IssuesService.generateTitle(vm.issueData); // Change name to title for display purposes
				vm.issueData.thumbnailPath = UtilsService.getServerUrl(vm.issueData.thumbnail);
				vm.issueData.comments.forEach(function(comment){
					if(comment.owner !== AuthService.getUsername()){
						comment.sealed = true;
					}
				});

				vm.hideDescription = !vm.issueData.hasOwnProperty("desc");
				if (vm.issueData.viewpoint.hasOwnProperty("screenshotSmall")) {
					vm.descriptionThumbnail = UtilsService.getServerUrl(vm.issueData.viewpoint.screenshotSmall);
				}

				// Issue owner or user with same role as issue creator role can update issue
				vm.canUpdate = (AuthService.getUsername() === vm.issueData.owner);
				if (!vm.canUpdate) {
					vm.canUpdate = vm.userJob._id && vm.issueData.creator_role && (vm.userJob._id === vm.issueData.creator_role);
				}

				if(!AuthService.hasPermission(ClientConfigService.permissions.PERM_CREATE_ISSUE, vm.modelSettings.permissions)){
					vm.canUpdate = false;
				}

				vm.setCanUpdateStatus(vm.issueData);

				// Can edit description if no comments
				vm.canEditDescription = (vm.issueData.comments.length === 0);

				// Role colour
				if (vm.issueData.assigned_roles.length > 0) {
					setRoleIndicatorColour(vm.issueData.assigned_roles[0]);
				} else {
					setRoleIndicatorColour(vm.issueData.creator_role);
				}

				// Old issues
				vm.issueData.priority = (!vm.issueData.priority) ? "none" : vm.issueData.priority;
				vm.issueData.status = (!vm.issueData.status) ? "open" : vm.issueData.status;
				vm.issueData.topic_type = (!vm.issueData.topic_type) ? "for_information" : vm.issueData.topic_type;
				vm.issueData.assigned_roles = (!vm.issueData.assigned_roles) ? [] : vm.issueData.assigned_roles;

				if(vm.issueData.status === "closed"){
					vm.canUpdate = false;
					vm.canComment = false;
				}
			
				vm.convertCommentTopicType();
				
			} else {
				vm.issueData = {
					priority: "none",
					status: "open",
					assigned_roles: [],
					topic_type: "for_information",
					viewpoint: {}
				};
				vm.canUpdate = true;
				vm.canUpdateStatus = true;
			}
		
			vm.statusIcon = IssuesService.getStatusIcon(vm.issueData);
			vm.setContentHeight();
	
			
			
		});

		/**
		 * Save a comment if one was being typed before close
		 * Cancel editing comment
		 */
		vm.$onDestroy = function () {

			vm.aboutToBeDestroyed = true;
			if (vm.comment) {
				IssuesService.updatedIssue = vm.issueData; // So that issues list is notified
				saveComment();
			}
			if (vm.editingCommentIndex !== null) {
				vm.issueData.comments[vm.editingCommentIndex].editing = false;
			}
			// Get out of pin drop mode

			EventService.send(EventService.EVENT.PIN_DROP_MODE, false);
			EventService.send(EventService.EVENT.MEASURE_MODE_BUTTON, "enable");
			vm.clearPin = true;
			

			//unsubscribe on destroy
			if(vm.data){
				NotificationService.unsubscribe.newComment(vm.data.account, vm.data.model, vm.data._id);
				NotificationService.unsubscribe.commentChanged(vm.data.account, vm.data.model, vm.data._id);
				NotificationService.unsubscribe.commentDeleted(vm.data.account, vm.data.model, vm.data._id);
				NotificationService.unsubscribe.issueChanged(vm.data.account, vm.data.model, vm.data._id);
			}
			
		};

		/**
		 * Disable the save button for a new issue if there is no name
		 */
		vm.nameChange = function () {
			
			vm.submitDisabled = !vm.issueData.name;
			if (!vm.submitDisabled) {
				vm.disabledReason = vm.reasonTitleText;
			}
		};

		/**
		 * Disable the save button when commenting on an issue if there is no comment
		 */
		vm.commentChange = function () {
			vm.submitDisabled = (vm.data && !vm.comment);
			if (!vm.submitDisabled) {
				vm.disabledReason = vm.reasonCommentText;
			}
		};

		/**
		 * Handle status change
		 */
		vm.statusChange = function () {
			var data,
				comment;

			vm.statusIcon = IssuesService.getStatusIcon(vm.issueData);
			setRoleIndicatorColour(vm.issueData.assigned_roles[0]);

			if (vm.data && vm.issueData.account && vm.issueData.model) {

				data = {
					priority: vm.issueData.priority,
					status: vm.issueData.status,
					topic_type: vm.issueData.topic_type,
					assigned_roles: vm.issueData.assigned_roles
				};
				
				IssuesService.updateIssue(vm.issueData, data)
					.then(function (response) {

					// Add info for new comment
						comment = response.data.issue.comments[response.data.issue.comments.length - 1];
						IssuesService.convertActionCommentToText(comment, vm.topic_types);
						comment.timeStamp = IssuesService.getPrettyTime(comment.created);
						vm.issueData.comments.push(comment);

						// Update last but one comment in case it was "sealed"
						if (vm.issueData.comments.length > 1) {
							vm.issueData.comments[vm.issueData.comments.length - 2].sealed = true;
						}

						// The status could have changed due to assigning role
						vm.issueData.status = response.data.issue.status;
						vm.issueData.assigned_roles = response.data.issue.assigned_roles;
						IssuesService.updatedIssue = vm.issueData;
						vm.setCanUpdateStatus(vm.issueData);

						commentAreaScrollToBottom();
					});


				if(vm.issueData.status === "closed"){
					vm.canUpdate = false;
					vm.canComment = false;
				}

				AnalyticService.sendEvent({
					eventCategory: "Issue",
					eventAction: "edit"
				});
			}
		};

		/**
		 * Submit - new issue or comment or update issue
		 */
		vm.submit = function () {
			
			vm.saving = true;

			if (vm.data) {
				saveComment();
			} else {
				vm.saveIssue();
			}
		};

		/**
		 * Show viewpoint
		 * @param event
		 * @param viewpoint Can be undefined for action comments
		 */
		vm.showViewpoint = function (event, viewpoint) {

			//README: vm should also highlight selected objects within vm issue, but 
			//will require a lot of rewriting for vm to work at present!
			if (viewpoint && (event.type === "click")) {

				// We clone the issueData so that we don't
				// overwrite the original issue data itself
				var newViewpointData = angular.copy(vm.issueData);
				newViewpointData.viewpoint = viewpoint;
				IssuesService.showIssue(newViewpointData);

			}
		};

		/**
		 * Show screen shot
		 * @param event
		 * @param viewpoint
		 */
		vm.showScreenShot = function (event, viewpoint) {
			vm.screenShot = UtilsService.getServerUrl(viewpoint.screenshot);
			vm.showScreenshotDialog(event);
		};

		/**
		 * Show screen shot dialog 
		 * @param event
		 */
		vm.showScreenshotDialog = function(event) {
			$mdDialog.show({
				controller: function () {
					this.issueComponent = vm; 
				},
				controllerAs: "vm",
				templateUrl: "templates/issue-screen-shot-dialog.html",
				targetEvent: event
			});
		};

		/**
		 * Do an action
		 * @param event
		 * @param action
		 */
		vm.doAction = function (event, action) {
			// Handle previous action
			vm.actions[action].selected = !vm.actions[action].selected;
			var selected = vm.actions[action].selected;

			switch(action){
			case "pin":

				if(selected){
					EventService.send(EventService.EVENT.PIN_DROP_MODE, true);
					EventService.send(EventService.EVENT.MEASURE_MODE_BUTTON, "disable");
				} else {
					EventService.send(EventService.EVENT.PIN_DROP_MODE, false);
					EventService.send(EventService.EVENT.MEASURE_MODE_BUTTON, "enable");
				}
				break;

			case "screen_shot":

					// There is no concept of selected in screenshot as there will be a popup once you click the button
				vm.actions[action].selected = false;

				delete vm.screenShot; // Remove any clicked on screen shot
				vm.showScreenshotDialog(event);
				break;

			}

		};

		/**
		 * Set the current add pin data
		 * @param pinData
		 */
		vm.setPin = function (pinData) {
			vm.pinData = pinData.data;
		};

		/**
		 * Toggle showing of extra inputs
		 */
		vm.toggleShowAdditional = function () {
	
			if(!vm.textInputHasFocusFlag) {
				//don't toggle if the user is trying to type
				vm.showAdditional = !vm.showAdditional;
				vm.setContentHeight();
			}
		};

		/**
		 * Edit or save description
		 * @param event
		 */
		vm.toggleEditDescription = function (event) {
			event.stopPropagation();
			if (vm.editingDescription) {
				vm.editingDescription = false;

				if (vm.issueData.desc !== vm.savedDescription) {
					var data = {
						desc: vm.issueData.desc
					};
					IssuesService.updateIssue(vm.issueData, data)
						.then(function (issueData) {
							IssuesService.updatedIssue = vm.issueData;
							vm.savedDescription = vm.issueData.desc;

							// Add info for new comment
							var comment = data.data.issue.comments[issueData.data.issue.comments.length - 1];
							IssuesService.convertActionCommentToText(comment, vm.topic_types);
							comment.timeStamp = IssuesService.getPrettyTime(comment.created);
							vm.issueData.comments.push(comment);
						});
				}

			} else {
				vm.editingDescription = true;
				vm.savedDescription = vm.issueData.desc;
			}
		};

		/**
		 * Register if text input has focus or not
		 * @param focus
		 */
		vm.textInputHasFocus = function (focus) {
			vm.textInputHasFocusFlag = focus;
		};

		/**
		 * This prevents show/hide of additional info when clicking in the input
		 * @param event
		 */
		vm.titleInputClick = function (event) {
			event.stopPropagation();
		};

		/**
		 * Save issue
		 */
		vm.saveIssue = function() {
			
			var viewpointPromise = $q.defer(),
				screenShotPromise = $q.defer(),
				objectsPromise = $q.defer();

			if (vm.commentViewpoint) {
				viewpointPromise.resolve(vm.commentViewpoint);
			} else {
				// Get the viewpoint
				EventService.send(
					EventService.EVENT.VIEWER.GET_CURRENT_VIEWPOINT, 
					{promise: viewpointPromise, account: vm.account, model: vm.model}
				);
			}

			//Get selected objects
			EventService.send(
				EventService.EVENT.VIEWER.GET_CURRENT_OBJECT_STATUS, 
				{promise: objectsPromise, account: vm.account, model: vm.model}
			);

			viewpointPromise.promise
				.then(function (viewpoint) {
					objectsPromise.promise
						.then(function(objectInfo) {
							handleObjects(viewpoint, objectInfo, screenShotPromise);
						})
						.catch(function(error){
							console.error(error);
						});
				})
				.catch(function(error){
					console.error(error);
				});

		};

		function handleObjects (viewpoint, objectInfo, screenShotPromise) {
			if (vm.savedScreenShot !== null) {

				if (objectInfo.highlightedNodes.length > 0) {
					// Create a group of selected objects
					vm.createGroup(viewpoint, vm.savedScreenShot, objectInfo);
				} else {
					vm.doSaveIssue(viewpoint, vm.savedScreenShot);
				}

			} else {
				// Get a screen shot if not already created
				EventService.send(
					EventService.EVENT.VIEWER.GET_SCREENSHOT, 
					{promise: screenShotPromise}
				);

				screenShotPromise.promise.then(function (screenShot) {
					if (objectInfo.highlightedNodes.length > 0) {
						vm.createGroup(viewpoint, screenShot, objectInfo);
					} else {
						vm.doSaveIssue(viewpoint, screenShot);
					}
				}).catch(function(error){
					console.error(error);
				});
				
			}
		}

		vm.createGroup = function(viewpoint, screenShot, objectInfo) {
			// Create a group of selected objects
			var groupData = {
				name: vm.issueData.name, 
				color: [255, 0, 0], 
				objects: objectInfo.highlightedNodes
			};

			UtilsService.doPost(groupData, vm.account + "/" + vm.model + "/groups")
				.then(function (response) {
					vm.doSaveIssue(viewpoint, screenShot, response.data._id);
				}).catch(function(error){
					console.error(error);
				});
		};


		/**
		 * Send new issue data to server
		 * @param viewpoint
		 * @param screenShot
		 * @param groupId
		 */
		vm.doSaveIssue = function(viewpoint, screenShot, groupId) {

			// Remove base64 header text from screenShot and add to viewpoint
			screenShot = screenShot.substring(screenShot.indexOf(",") + 1);
			viewpoint.screenshot = screenShot;

			// Save issue
			var issue = {
				account: vm.account,
				model: vm.model,
				objectId: null,
				name: vm.issueData.name,
				viewpoint: viewpoint,
				creator_role: vm.userJob._id,
				pickedPos: null,
				pickedNorm: null,
				scale: 1.0,
				assigned_roles: vm.issueData.assigned_roles,
				priority: vm.issueData.priority,
				status: vm.issueData.status,
				topic_type: vm.issueData.topic_type,
				desc: vm.issueData.desc,
				rev_id: vm.revision
			};
			// Pin data
			if (vm.pinData !== null) {
				issue.pickedPos = vm.pinData.pickedPos;
				issue.pickedNorm = vm.pinData.pickedNorm;
			}
			// Group data
			if (angular.isDefined(groupId)) {
				issue.group_id = groupId;
			}

			IssuesService.saveIssue(issue)
				.then(function (response) {
					vm.data = response.data; // So that new changes are registered as updates
					vm.issueData = response.data;
					
					vm.issueData.title = IssuesService.generateTitle(vm.issueData);
					vm.issueData.thumbnailPath = UtilsService.getServerUrl(vm.issueData.thumbnail);
					vm.descriptionThumbnail = UtilsService.getServerUrl(vm.issueData.viewpoint.screenshotSmall);
					vm.issueData.timeStamp = IssuesService.getPrettyTime(vm.issueData.created);

					// Hide the description input if no description
					vm.hideDescription = !vm.issueData.hasOwnProperty("desc");
					vm.pinHidden = true;

					// Notify parent of new issue
					vm.issueCreated({issue: vm.issueData});

					// Hide some actions
					EventService.send(EventService.EVENT.PIN_DROP_MODE, false);

					vm.submitDisabled = true;
					vm.setContentHeight();

					startNotification();
					vm.saving = false;

					var issueState = {
						account: vm.account, 
						model: vm.model, 
						revision: vm.revision,
						issue: vm.data._id,
						noSet: true
					};
					
					vm.disabledReason = vm.reasonCommentText;
					
					$state.go(
						"home.account.model.issue",
						issueState , 
						{notify: false}
					);
				})
				.catch(function(error){
					console.error("Something went wrong saving the Issue: ", error);
				});

			AnalyticService.sendEvent({
				eventCategory: "Issue",
				eventAction: "create"
			});
		};

		/**
		 * Add comment to issue
		 * Save screen shot viewpoint or current viewpoint
		 */
		function saveComment () {
			var	viewpointPromise = $q.defer();

			if (angular.isDefined(vm.commentThumbnail)) {
				IssuesService.saveComment(vm.issueData, vm.comment, vm.commentViewpoint)
					.then(function (response) {
						vm.saving = false;
						afterNewComment(response.data.issue);
					});
			} else {
				EventService.send(
					EventService.EVENT.VIEWER.GET_CURRENT_VIEWPOINT, 
					{promise: viewpointPromise, account: vm.issueData.account, model: vm.issueData.model}
				);
				
				viewpointPromise.promise.then(function (viewpoint) {
					IssuesService.saveComment(vm.issueData, vm.comment, viewpoint)
						.then(function (response) {
							vm.saving = false;
							afterNewComment(response.data.issue);
						});
				});
			}

			AnalyticService.sendEvent({
				eventCategory: "Issue",
				eventAction: "comment"
			});
		}

		/**
		 * Process after new comment saved
		 * @param comment
		 */
		function afterNewComment(comment, noDeleteInput) {

			// mark all other comments sealed
			vm.issueData.comments.forEach(function(otherComment){
				otherComment.sealed = true;
			});

			if(comment.owner !== AuthService.getUsername()){
				comment.sealed = true;
			}

			if(comment.viewpoint && comment.viewpoint.screenshot){
				comment.viewpoint.screenshotPath = UtilsService.getServerUrl(comment.viewpoint.screenshot);
			}


			// Add new comment to issue
			if (!vm.issueData.comments) {
				vm.issueData.comments = [];
			}
			vm.issueData.comments.push({
				sealed: comment.sealed,
				guid: comment.guid,
				comment: comment.comment,
				owner: comment.owner,
				timeStamp: IssuesService.getPrettyTime(comment.created),
				viewpoint: comment.viewpoint,
				action: comment.action
			});

			if(!noDeleteInput){
				delete vm.comment;
				delete vm.commentThumbnail;
				IssuesService.updatedIssue = vm.issueData;
				vm.submitDisabled = true;
			}


			commentAreaScrollToBottom();
			// Don't set height of content if about to be destroyed as it overrides the height set by the issues list
			if (!vm.aboutToBeDestroyed) {
				vm.setContentHeight();
			}
		}

		/**
		 * Delete a comment
		 * @param event
		 * @param index
		 */
		vm.deleteComment = function(event, index) {
			event.stopPropagation();
			IssuesService.deleteComment(vm.issueData, index)
				.then(function() {
					vm.issueData.comments.splice(index, 1);
				});
			AnalyticService.sendEvent({
				eventCategory: "Issue",
				eventAction: "deleteComment"
			});
			vm.setContentHeight();
		};

		/**
		 * Toggle the editing of a comment
		 * @param event
		 * @param index
		 */
		vm.toggleEditComment = function(event, index) {
			event.stopPropagation();
			if (vm.issueData.comments[index].editing) {
				vm.editingCommentIndex = null;
				vm.issueData.comments[index].editing = false;
				if (vm.issueData.comments[index].comment !== vm.savedComment) {
					IssuesService.editComment(vm.issueData, vm.issueData.comments[index].comment, index)
						.then(function(response) {
							vm.issueData.comments[index].timeStamp = IssuesService.getPrettyTime(response.data.created);
							IssuesService.updatedIssue = vm.issueData;
							vm.savedComment = vm.issueData.comments[index].comment;
						});
					AnalyticService.sendEvent({
						eventCategory: "Issue",
						eventAction: "editComment"
					});
				}
			} else {
				vm.editingCommentIndex = index;
				vm.issueData.comments[index].editing = true;
				vm.savedComment = vm.issueData.comments[index].comment;
			}
		};

		/**
		 * A screen shot has been saved
		 * @param data
		 */
		vm.screenShotSave = function (data) {
			var viewpointPromise = $q.defer();

			vm.savedScreenShot = data.screenShot;

			if (typeof vm.data === "object") {

				// Comment
				vm.commentThumbnail = data.screenShot;

				// Get the viewpoint and add the screen shot to it
				// Remove base64 header text from screen shot
				EventService.send(
					EventService.EVENT.VIEWER.GET_CURRENT_VIEWPOINT,
					{promise: viewpointPromise, account: vm.issueData.account, model: vm.issueData.model}
				);

			} else {
				// Description
				vm.descriptionThumbnail = data.screenShot;
				
				EventService.send(
					EventService.EVENT.VIEWER.GET_CURRENT_VIEWPOINT, 
					{promise: viewpointPromise, account: vm.account, model: vm.model}
				);
			}

			viewpointPromise.promise.then(function (viewpoint) {
				vm.commentViewpoint = viewpoint;
				vm.commentViewpoint.screenshot = data.screenShot.substring(data.screenShot.indexOf(",") + 1);
			}).catch(function(error){
				console.error("Screenshot request failed: ", error);
			});

			vm.setContentHeight();
		};


		/**
		 * Set the role indicator colour
		 * @param {String} role
		 */
		function setRoleIndicatorColour (role) {
			var roleColor = IssuesService.getJobColor(role);
			if (roleColor !== null) {
				vm.issueRoleIndicator.css("background", IssuesService.getJobColor(role));
				vm.issueRoleIndicator.css("border", "none");
			} else {
				vm.issueRoleIndicator.css("background", "none");
				vm.issueRoleIndicator.css("border", "1px solid #DDDDDD");
			}
		}

		/**
		 * Check if user has a role same as the creator role
		 * @returns {boolean}
		 */
		function userHasCreatorRole () {
			if(vm.userJob._id && vm.data.creator_role){
				return vm.userJob._id === vm.data.creator_role;
			}
		}

		/**
		 * Check if user has admin role
		 * @returns {boolean}
		 */
		function userHasAdminRole () {
			var hasAdminRole = false;
			return hasAdminRole;
		}

		/**
		 * Set the content height
		 */
		vm.setContentHeight = function() {
			var i, length,
				newIssueHeight = 305,
				descriptionTextHeight = 80,
				commentTextHeight = 80,
				commentImageHeight = 170,
				additionalInfoHeight = 160,
				thumbnailHeight = 180,
				issueMinHeight = 370,
				height = issueMinHeight;
			
			if (vm.data) {
				
				// Additional info
				if (vm.showAdditional) {
					height += additionalInfoHeight;
				}
				// Description text
				if (vm.canEditDescription || (vm.issueData && vm.issueData.hasOwnProperty("desc")) ) {
					height += descriptionTextHeight;
				}
				// Description thumbnail
				height += thumbnailHeight;
				// New comment thumbnail
				if (vm.commentThumbnail) {
					height += thumbnailHeight;
				}
				// Comments
				if (vm.issueData && vm.issueData.comments) {
					for (i = 0, length = vm.issueData.comments.length; i < length; i += 1) {
						height += commentTextHeight;
						if (vm.issueData.comments[i].viewpoint && vm.issueData.comments[i].viewpoint.hasOwnProperty("screenshot")) {
							height += commentImageHeight;
						}
					}
				}

				
			} else {
				height = newIssueHeight;
				if (vm.showAdditional) {
					height += additionalInfoHeight;
				}
				// Description thumbnail
				if (vm.descriptionThumbnail) {
					height += thumbnailHeight;
				}
			}

			if (height) {
				vm.contentHeight({height: height});
			} else {
				console.error("Height was trying to be set to falsy value");
			}
			

		};

		function commentAreaScrollToBottom(){

			$timeout(function(){
				var commentArea = document.getElementById("descriptionAndComments");
				if (commentArea) {
					commentArea.scrollTop = commentArea.scrollHeight;
				}
			});
		}


		function startNotification(){
			if(vm.data && !vm.notificationStarted){

				vm.notificationStarted = true;

				/*
				* Watch for new comments
				*/
				NotificationService.subscribe.newComment(vm.data.account, vm.data.model, vm.data._id, function(comment){

					if(comment.action){
						IssuesService.convertActionCommentToText(comment, vm.topic_types);
					}

					afterNewComment(comment, true);

					//necessary to apply scope.apply and reapply scroll down again here because vm function is not triggered from UI
					$scope.$apply();
					commentAreaScrollToBottom();
				});

				/*
				* Watch for comment changed
				*/
				NotificationService.subscribe.commentChanged(vm.data.account, vm.data.model, vm.data._id, function(newComment){

					var comment = vm.issueData.comments.find(function(oldComment){
						return oldComment.guid === newComment.guid;
					});

					comment.comment = newComment.comment;

					$scope.$apply();
					commentAreaScrollToBottom();
				});

				/*
				* Watch for comment deleted
				*/
				NotificationService.subscribe.commentDeleted(vm.data.account, vm.data.model, vm.data._id, function(newComment){

					var deleteIndex;
					vm.issueData.comments.forEach(function(comment, i){
						if (comment.guid === newComment.guid){
							deleteIndex = i;
						}
					});

					vm.issueData.comments[deleteIndex].comment = "This comment has been deleted.";


					$scope.$apply();
					commentAreaScrollToBottom();

					$timeout(function(){
						vm.issueData.comments.splice(deleteIndex, 1);
					}, 4000);
				});

				/*
				* Watch for issue change
				*/
				NotificationService.subscribe.issueChanged(vm.data.account, vm.data.model, vm.data._id, function(issue){

					vm.issueData.topic_type = issue.topic_type;
					vm.issueData.desc = issue.desc;
					vm.issueData.priority = issue.priority;
					vm.issueData.status = issue.status;
					vm.issueData.assigned_roles = issue.assigned_roles;

					vm.statusIcon = IssuesService.getStatusIcon(vm.issueData);
					setRoleIndicatorColour(vm.issueData.assigned_roles[0]);
					vm.setCanUpdateStatus(vm.issueData);

					$scope.$apply();

				});
			}
		}

	}
}());
