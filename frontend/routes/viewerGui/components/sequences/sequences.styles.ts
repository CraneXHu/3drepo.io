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

import styled from 'styled-components';

import {
	VIEWER_PANELS,
	VIEWER_PANELS_ICONS,
	VIEWER_PANELS_MIN_HEIGHTS,
	VIEWER_PANELS_TITLES
} from '../../../../constants/viewerGui';

import { Grid, Input } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { COLOR, FONT_WEIGHT } from '../../../../styles';
import { DateField } from '../../../components/dateField/dateField.component';
import { ViewerPanel } from '../viewerPanel/viewerPanel.component';

export const SequencesIcon = VIEWER_PANELS_ICONS[VIEWER_PANELS.SEQUENCES];

export const SequencesContainer = styled(ViewerPanel).attrs({
	title: VIEWER_PANELS_TITLES[VIEWER_PANELS.SEQUENCES]
})`
	min-height: ${VIEWER_PANELS_MIN_HEIGHTS[VIEWER_PANELS.SEQUENCES]}px;
`;

export const SequenceSlider = styled(Slider)`
	&& {
		width: 305px;
	}
`;

export const SequencePlayerContainer = styled(Grid).attrs({
	container: true,
	direction: 'column',
	justify: 'flex-start',
	alignItems: 'center'
})`
	&& {
		overflow: hidden;
	}
`;

export const TasksContainer = styled(Grid)`
	&&  {
		font-size: 14px;
		margin-left: 20px;
	}
`;

export const Task = styled(Grid)`
	&&  {
		padding-left: ${(props) => props.hasSubTasks ? '0px' : '48px'};
	}
`;

export const SequenceRow = styled(Grid).attrs({
	container: true,
	direction: 'row',
	justify: 'flex-start',
	alignItems: 'center',
	item: true
})`
	&& {
		width: auto;
	}
`;

export const IntervalRow = styled(SequenceRow)`
	&& {
		font-size: 14px;
		margin-top: -10px;
		margin-right: -15px;
	}
`;

export const DatePicker = styled(DateField)`
	&& {
		width: 113px;
		margin-top: 0;
	}

	input {
		font-size: 20px;
	}
`;

export const StepInput = styled(Input).attrs({
	inputProps: {
		type: 'number',
		min: 1,
		max: 100
	}
})`
	&& {
		font-weight: ${FONT_WEIGHT.NORMAL};
		width: 40px;
	}

	input {
		width: 40px;
		height: 20px;
		font-size: 14px;
		margin-left: 2px;
		outline: none;
		color: ${COLOR.BLACK_60};
		padding-bottom: 4px;
		text-align: right;
	}
`;
