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

import { groupBy, isEmpty } from 'lodash';
import * as React from 'react';
import SimpleBar from 'simplebar-react';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

import { Loader } from '../components/loader/loader.component';
import { Panel } from '../components/panel/panel.component';
import { TreeList } from '../components/treeList/treeList.component';
import { ModelItem } from './components/modelItem/modelItem.component';
import { Head, List, LoaderContainer, MenuButton } from './teamspaces.styles';
import { ButtonMenu } from '../components/buttonMenu/buttonMenu.component';

const PANEL_PROPS = {
	title: 'Teamspaces',
	paperProps: {
		height: '100%'
	}
};

interface IProps {
	currentTeamspace: string;
	teamspaces: any[];
	isPending: boolean;
	onPermissionsClick: () => void;
	onSettingsClick: () => void;
	onDeleteClick: () => void;
	onEditClick: () => void;
	onRevisionsClick: () => void;
	onDownloadClick: () => void;
	onUploadClick: () => void;
}

interface IState {
	activeTeamspace: string;
}

export class Teamspaces extends React.PureComponent<IProps, IState> {
	public static defaultProps = {
		teamspaces: []
	};

	public state = {
		activeTeamspace: ''
	};

	public sharedActions = [{
		label: 'Permissions',
		action: this.props.onPermissionsClick,
		icon: 'people'
	}, {
		label: 'Settings',
		action: this.props.onSettingsClick,
		icon: 'settings'
	}, {
		label: 'Delete',
		action: this.props.onDeleteClick,
		icon: 'delete',
		color: 'error'
	}];

	public modelActions = [{
		label: 'Upload file',
		action: this.props.onUploadClick,
		icon: 'cloud_upload'
	}, {
		label: 'Revisions',
		action: this.props.onRevisionsClick,
		icon: 'settings_backup_restore'
	}, {
		label: 'Download',
		action: this.props.onDownloadClick,
		icon: 'cloud_download'
	}];

	public federationActions = [{
		label: 'Edit',
		action: this.props.onEditClick,
		icon: 'edit'
	}];

	public componentDidMount() {
		this.setState({
			activeTeamspace: this.props.currentTeamspace
		});
	}

	public componentDidUpdate(prevProps) {
		const changes = {} as IState;

		const currentTeamspaceChanged = this.props.currentTeamspace !== prevProps.currentTeamspace;
		if (currentTeamspaceChanged) {
			changes.activeTeamspace = this.props.currentTeamspace;
		}

		if (!isEmpty(changes)) {
			this.setState(changes);
		}
	}

	public onTeamspaceClick = (teamspace) => {
		this.setState({ activeTeamspace: teamspace.account });
	}

	public renderModel = (actions, props) => {
		return <ModelItem {...props} actions={actions} />;
	}

	public renderProjectItem = (props) => {
		const actions = [
			...(props.name === 'Federations' ? this.federationActions : this.modelActions),
			...this.sharedActions
		];

		return (
			<TreeList
				{...props}
				level={3}
				renderItem={this.renderModel.bind(this, actions)}
				active={true}
				disableShadow={true}
			/>
		);
	}

	public renderProject = (props) => {
		const {federations = [], models } = groupBy(props.models, ({federate}) => {
			return federate ? 'federations' : 'models';
		});
		const items = [{
			name: 'Federations',
			items: federations
		}, {
			name: 'Models',
			items: models
		}];

		return (
			<TreeList
				key={props.key}
				name={props.name}
				level={2}
				items={items}
				renderItem={this.renderProjectItem}
			/>
		);
	}

	public renderTeamspaces = (teamspaces) => {
		return teamspaces.map((teamspace, index) => {
			return (
				<TreeList
					key={index}
					name={teamspace.account}
					level={1}
					items={teamspace.projects}
					renderItem={this.renderProject}
					onRootClick={this.onTeamspaceClick.bind(this, teamspace)}
					active={teamspace.account === this.state.activeTeamspace}
				/>
			);
		});
	}

	public renderMenuButton = (isPending, props) => (
		<MenuButton
			buttonRef={props.buttonRef}
			variant="fab"
			color="secondary"
			aria-label="Toggle menu"
			aria-haspopup="true"
			mini={true}
			onClick={props.onClick}
			disabled={isPending}
		>
			<Icon>add</Icon>
		</MenuButton>
	)

	public renderMenu = () => {
		return (
			<>
				<MenuItem>Add project</MenuItem>
				<MenuItem>Add model</MenuItem>
				<MenuItem>Add federation</MenuItem>
			</>
		);
	}

	public render() {
		const { isPending } = this.props;

		return (
			<Panel {...PANEL_PROPS}>
				<Head>
					3D MODELS & FEDERATIONS
					<ButtonMenu
						icon="add"
						renderButton={this.renderMenuButton.bind(this, isPending)}
						renderContent={this.renderMenu}
						PopoverProps={{
							anchorOrigin: {
								vertical: 'center',
								horizontal: 'left'
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'right'
							}
						}}
					/>
				</Head>
				<List>
					{
						isPending ? (
							<LoaderContainer>
								<Loader content="Loading teamspaces..." />
							</LoaderContainer>
						) : (
							<SimpleBar>
								{this.renderTeamspaces(this.props.teamspaces)}
							</SimpleBar>
						)
					}
				</List>
			</Panel>
		);
	}
}
