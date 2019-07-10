/**
 *  Copyright (C) 2019 3D Repo Ltd
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.ś
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from 'react';
import { isEmpty } from 'lodash';

import { VIEWER_LEFT_PANELS, VIEWER_PANELS } from '../../constants/viewerGui';
import Toolbar from './components/toolbar/toolbar.container';
import Gis from './components/gis/gis.container';
import { Views } from './components/views';
import { Risks } from './components/risks';
import { Groups } from './components/groups';
import { Issues } from './components/issues';
import { Compare } from './components/compare';
import { Tree } from './components/tree';
import { Bim } from './components/bim';
import { PanelButton } from './components/panelButton/panelButton.component';
import RevisionsSwitch from './components/revisionsSwitch/revisionsSwitch.container';
import { ViewerLoader } from './components/viewerLoader';
import { CloseFocusModeButton } from './components/closeFocusModeButton';
import { Container, LeftPanels, RightPanels, LeftPanelsButtons } from './viewerGui.styles';
import { renderWhenTrue } from '../../helpers/rendering';

interface IProps {
	viewer: any;
	className?: string;
	modelSettings: any;
	isModelPending: boolean;
	isFocusMode: boolean;
	match: {
		params: {
			model: string;
			teamspace: string;
			revision?: string;
		}
	};
	queryParams: {
		issueId?: string;
		riskId?: string;
	};
	visiblePanels: any;
	stopListenOnSelections: () => void;
	stopListenOnModelLoaded: () => void;
	stopListenOnClickPin: () => void;
	fetchData: (teamspace, model, revision?) => void;
	loadModel: () => void;
	resetPanelsStates: () => void;
	setPanelVisibility: (panelName, visibility) => void;
}

interface IState {
	loadedModelId: string;
	showLoader: boolean;
	loaderType: string;
	loaderProgress: number;
}

export class ViewerGui extends React.PureComponent<IProps, IState> {
	public state = {
		loadedModelId: null,
		showLoader: false,
		loaderType: null,
		loaderProgress: 0
	};

	public componentDidMount() {
		const { queryParams: { issueId, riskId }, match: { params }, viewer } = this.props;

		viewer.init();

		if (issueId || riskId) {
			if (issueId) {
				this.props.setPanelVisibility(VIEWER_PANELS.ISSUES, true);
			}
			if (riskId) {
				this.props.setPanelVisibility(VIEWER_PANELS.RISKS, true);
			}
		}

		this.props.fetchData(params.teamspace, params.model, params.revision);
	}

	public componentDidUpdate(prevProps: IProps, prevState: IState) {
		const changes = {} as IState;
		const { modelSettings, isModelPending, match: { params }, queryParams } = this.props;
		const teamspaceChanged = params.teamspace !== prevProps.match.params.teamspace;
		const modelChanged = params.model !== prevProps.match.params.model;
		const revisionChanged = params.revision !== prevProps.match.params.revision;

		const { issueId, riskId } = queryParams;

		if (issueId !== prevProps.queryParams.issueId) {
			this.props.setPanelVisibility(VIEWER_PANELS.ISSUES, true);
		}
		if (riskId !== prevProps.queryParams.riskId) {
			this.props.setPanelVisibility(VIEWER_PANELS.RISKS, true);
		}

		if (teamspaceChanged || modelChanged || revisionChanged) {
			this.props.fetchData(params.teamspace, params.model, params.revision);
		}

		const settingsChanged = modelSettings._id !== prevState.loadedModelId;

		if (!isModelPending && (settingsChanged || revisionChanged)) {
			changes.loadedModelId = modelSettings._id;
			this.handleModelSettingsChange();
		}

		if (!isEmpty(changes)) {
			this.setState(changes);
		}
	}

	public componentWillUnmount() {
		this.props.stopListenOnSelections();
		this.props.stopListenOnModelLoaded();
		this.props.stopListenOnClickPin();
		this.props.resetPanelsStates();
		this.props.viewer.destroy();
	}

	private get urlParams() {
		return this.props.match.params;
	}

	public renderViewerLoader = renderWhenTrue(() => <ViewerLoader />);

	public render() {
		const { visiblePanels, isFocusMode, viewer } = this.props;

		return (
			<>
				<CloseFocusModeButton isFocusMode={isFocusMode} />
				<Container className={this.props.className} hidden={isFocusMode}>
					<RevisionsSwitch />
					<Toolbar {...this.urlParams.teamspace} />
					{this.renderLeftPanelsButtons()}
					{this.renderLeftPanels(visiblePanels)}
					{this.renderRightPanels(visiblePanels)}
					{this.renderViewerLoader(viewer.hasInstance)}
				</Container>
			</>
		);
	}

	private handleModelSettingsChange() {
		this.props.loadModel();
	}

	private handleTogglePanel = (panelType) => {
		this.props.setPanelVisibility(panelType, !this.props.visiblePanels[panelType]);
	}

	private renderLeftPanelsButtons = () => (
		<LeftPanelsButtons>
			{VIEWER_LEFT_PANELS.map(({ name, type }) => (
				<PanelButton
					key={type}
					onClick={this.handleTogglePanel}
					label={name}
					type={type}
					active={this.props.visiblePanels[type]}
				/>
			))}
		</LeftPanelsButtons>
	)

	private renderLeftPanels = (visiblePanels) => (
		<LeftPanels>
			{visiblePanels[VIEWER_PANELS.ISSUES] && <Issues {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.RISKS] && <Risks {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.GROUPS] && <Groups {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.VIEWS] && <Views {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.TREE] && <Tree {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.COMPARE] && <Compare {...this.urlParams} />}
			{visiblePanels[VIEWER_PANELS.GIS] && <Gis {...this.urlParams} />}
		</LeftPanels>
	)

	private renderRightPanels = (visiblePanels) => (
		<RightPanels>
			{visiblePanels[VIEWER_PANELS.BIM] && <Bim {...this.urlParams} />}
		</RightPanels>
	)
}