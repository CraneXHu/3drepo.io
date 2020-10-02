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

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Copy from '@material-ui/icons/FileCopy';
import styled from 'styled-components';
import { COLOR } from '../../../styles';

export const Container = styled.div`
	position: relative;
	width: 100%;
`;

export const StyledTextField = styled(TextField)`
	&& {
		input{
			padding-right: 50px;
		}
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	position: absolute;
	bottom: 4px;
	right: 0;
`;

export const ButtonWrapper = styled.div`
	position: relative;
	height: 50px;
`;

export const StyledIconButton = styled(IconButton)`
	&& {
		width: 28px;
		height: 28px;
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: ${COLOR.BLACK_50}
	}
`;

export const CopyIcon = styled(Copy)`
	&& {
		font-size: 18px;
		position: absolute;
	}
`;
