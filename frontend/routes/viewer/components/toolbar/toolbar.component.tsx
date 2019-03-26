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

import * as React from 'react';

import Fade from '@material-ui/core/Fade';
import HomeIcon from '@material-ui/icons/Home';
import ClipIcon from '@material-ui/icons/Crop';
import FocusIcon from '@material-ui/icons/CenterFocusStrong';
import ShowAllIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';
import IsolateIcon from '@material-ui/icons/VisibilityOutlined';
import MetadataIcon from '@material-ui/icons/Info';
import TurntableIcon from '@material-ui/icons/Redo';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import IncreaseIcon from '@material-ui/icons/Add';
import DecreaseIcon from '@material-ui/icons/Remove';
import ResetIcon from '@material-ui/icons/Replay';

import { Helicopter, Ruler } from '../../../components/fontAwesomeIcon';
import { renderWhenTrue } from '../../../../helpers/rendering';

import {
	Container,
	ButtonWrapper,
	Submenu,
	ClipIconWrapper,
	ClipNumber
} from './toolbar.styles';
import { TooltipButton } from '../../../teamspaces/components/tooltipButton/tooltipButton.component';

import { VIEWER_NAV_MODES, VIEWER_CLIP_MODES, VIEWER_TOOLBAR_ITEMS } from '../../../../constants/viewer';
import {
	INITIAL_HELICOPTER_SPEED, MIN_HELICOPTER_SPEED, MAX_HELICOPTER_SPEED
} from '../../../../services/viewer/viewer';

const MeasureIcon = () => <Ruler IconProps={{ className: 'fontSizeSmall' }} />;
const HelicopterIcon = () => <Helicopter IconProps={{ className: 'fontSizeSmall' }} />;

interface IProps {
	teamspace: string;
	model: string;
	navigationMode: string;
	helicopterSpeed: number;
	isFocusMode: boolean;
	clippingMode: string;
	isClipEdit: boolean;
	clipNumber: number;
	isMetadataVisible: boolean;
	measureState: any;
	goToExtent: () => void;
	setNavigationMode: (navigationMode) => void;
	initialiseToolbar: () => void;
	increaseHelicopterSpeed: (teamspace, modelId) => void;
	decreaseHelicopterSpeed: (teamspace, modelId) => void;
	resetHelicopterSpeed: (teamspace, modelId, updateDefaultSpeed) => void;
	showAllNodes: () => void;
	hideSelectedNodes: () => void;
	isolateSelectedNodes: () => void;
	setIsFocusMode: (isFocusMode) => void;
	setClippingMode: (clippingMode) => void;
	toggleClipEdit: () => void;
	toggleMetadata: () => void;
	toggleMeasure: () => void;
	deactivateMeasure: () => void;
}

interface IState {
	activeButton: string;
	activeSubMenu: string;
}

const ClipIconWithNumber = ({clipNumber}) => (
	<ClipIconWrapper>
		<ClipNumber>{clipNumber}</ClipNumber>
		<ClipIcon />
	</ClipIconWrapper>
);

export class Toolbar extends React.PureComponent<IProps, IState> {
	public state = {
		activeButton: '',
		activeSubMenu: ''
	};

	public componentDidMount() {
		this.props.initialiseToolbar();
	}

	public componentDidUpdate(prevProps) {
		if (this.props.isFocusMode !== prevProps.isFocusMode) {
			const uiVisibility = this.props.isFocusMode ? 'hidden' : 'initial';
			const modelUI = document.querySelector('#modelUI') as HTMLElement;
			const topMenu = document.querySelector('#topMenu') as HTMLElement;

			modelUI.style.visibility = uiVisibility;
			topMenu.style.visibility = uiVisibility;
		}

		if (!this.props.clippingMode && prevProps.clippingMode) {
			this.setState({
				activeSubMenu: ''
			});
		}
	}

	public componentWillUnmount() {
		this.props.deactivateMeasure();
	}

	public handleNavigationModeClick = (mode) => {
		this.props.setNavigationMode(mode);
		this.setState({
			activeSubMenu: ''
		});
	}

	public handleClickAway = () => {
		this.setState({
			activeSubMenu: ''
		});
	}

	public handleShowSubmenu = (label) => {
		this.setState((prevState) => ({
			activeSubMenu: prevState.activeSubMenu !== label ? label : ''
		}));
	}

	public get toolbarList() {
		return [
			{
				label: VIEWER_TOOLBAR_ITEMS.EXTENT,
				Icon: HomeIcon,
				action: this.props.goToExtent
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.TURNTABLE,
				Icon: TurntableIcon,
				action: () => this.handleShowSubmenu(VIEWER_TOOLBAR_ITEMS.TURNTABLE),
				show: this.props.navigationMode === VIEWER_NAV_MODES.TURNTABLE,
				subMenu: [
					{
						label: VIEWER_TOOLBAR_ITEMS.HELICOPTER,
						Icon: HelicopterIcon,
						action: () => this.handleNavigationModeClick(VIEWER_NAV_MODES.HELICOPTER)
					}
				]
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.HELICOPTER,
				Icon: HelicopterIcon,
				action: () => this.handleShowSubmenu(VIEWER_TOOLBAR_ITEMS.HELICOPTER),
				show: this.props.navigationMode === VIEWER_NAV_MODES.HELICOPTER,
				subMenu: [
					{
						label: `Reset speed to ${INITIAL_HELICOPTER_SPEED}`,
						Icon: ResetIcon,
						action: () => this.props.resetHelicopterSpeed(this.props.teamspace, this.props.model, true),
						specificOption: true
					},
					{
						label: `Increase speed to ${this.props.helicopterSpeed + 1}`,
						Icon: IncreaseIcon,
						action: () => this.props.increaseHelicopterSpeed(this.props.teamspace, this.props.model),
						specificOption: true,
						disabled: this.props.helicopterSpeed === MAX_HELICOPTER_SPEED
					},
					{
						label: `Decrease speed to ${this.props.helicopterSpeed - 1}`,
						Icon: DecreaseIcon,
						action: () => this.props.decreaseHelicopterSpeed(this.props.teamspace, this.props.model),
						specificOption: true,
						disabled: this.props.helicopterSpeed === MIN_HELICOPTER_SPEED
					},
					{
						label: VIEWER_TOOLBAR_ITEMS.TURNTABLE,
						Icon: TurntableIcon,
						action: () => this.handleNavigationModeClick(VIEWER_NAV_MODES.TURNTABLE)
					}
				]
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.SHOW_ALL,
				Icon: ShowAllIcon,
				action: this.props.showAllNodes
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.HIDE,
				Icon: HideIcon,
				action: this.props.hideSelectedNodes
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.ISOLATE,
				Icon: IsolateIcon,
				action: this.props.isolateSelectedNodes
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.FOCUS,
				Icon: FocusIcon,
				action: () => this.props.setIsFocusMode(true)
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.CLIP,
				Icon: ClipIcon,
				action: () => this.handleShowSubmenu(VIEWER_TOOLBAR_ITEMS.CLIP),
				show: !this.props.clippingMode,
				subMenu: [
					{
						label: 'Start box clip',
						Icon: () => <ClipIconWithNumber clipNumber={6} />,
						action: () => this.props.setClippingMode(VIEWER_CLIP_MODES.BOX)
					},
					{
						label: 'Start single clip',
						Icon: () => <ClipIconWithNumber clipNumber={1} />,
						action: () => this.props.setClippingMode(VIEWER_CLIP_MODES.SINGLE)
					}
				]
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.CLIP,
				Icon: () =>	<ClipIconWithNumber clipNumber={this.props.clipNumber} />,
				action: () => this.props.toggleClipEdit(),
				show: this.props.clippingMode && this.props.clipNumber,
				active: this.props.isClipEdit
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.MEASURE,
				Icon: MeasureIcon,
				action: this.props.toggleMeasure,
				active: this.props.measureState.active
			},
			{
				label: VIEWER_TOOLBAR_ITEMS.BIM,
				Icon: MetadataIcon,
				action: this.props.toggleMetadata,
				active: this.props.isMetadataVisible
			}
		];
	}

	public renderButtons = () => {
		return this.toolbarList.map((
			{label, Icon, action, show = true, subMenu = [], active = false }, index
			) => renderWhenTrue(() => (
			<ButtonWrapper key={index}>
				<TooltipButton
					className="toolbarButton"
					label={label}
					Icon={Icon}
					action={action}
					active={active}
				/>
				{this.renderSubmenu(subMenu, label)}
			</ButtonWrapper>)
		)(show));
	}

	public renderSubmenu = (subMenu, label) => renderWhenTrue(() => {
		const condition = this.state.activeSubMenu === label;
		return (
			<Fade in={condition}>
				<ClickAwayListener onClickAway={this.handleClickAway}>
					<Submenu>{subMenu.map((subButton, subKey) => (
						<TooltipButton
							key={subKey}
							className={`toolbarButton toolbarSubButton ${subButton.specificOption && 'toolbarSpecificButton'}`}
							label={subButton.label}
							Icon={subButton.Icon}
							action={subButton.action}
							disabled={subButton.disabled} />)
						)}
					</Submenu>
				</ClickAwayListener>
			</Fade>
		);
	})(subMenu.length && this.state.activeSubMenu === label)

	public render() {
		return (
			<Container visible={!this.props.isFocusMode}>
				{this.renderButtons()}
			</Container>
		);
	}
}
