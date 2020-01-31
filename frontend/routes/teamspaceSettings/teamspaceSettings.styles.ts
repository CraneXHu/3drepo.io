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

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Form } from 'formik';
import styled, { css } from 'styled-components';
import { COLOR } from '../../styles';

export const StyledTextField = styled(TextField)``;

export const FieldsRow = styled(Grid)`
	${StyledTextField} {
		width: 100%;
		margin-left: 12px;
		margin-right: 12px;
	}

	${/* sc-selector */ StyledTextField}:nth-child(2n) {
		margin-left: 12px;
	}

	${/* sc-selector */ StyledTextField}:nth-child(2n + 1) {
		margin-left: 0;
	}

	${/* sc-selector */ StyledTextField}:last-child {
		margin-right: 0;
	}
`;

export const StyledGrid = styled(Grid)`
	padding: 24px 24px 0;
`;

export const SuggestionsContainer = styled(Grid)`
	&& {
		padding: 0 24px 24px;
		max-width: 400px;
	}
`;
export const ButtonRowContainer = styled(Grid)`
	&& {
		padding: 10px 0;
	}
`;

export const StyledForm = styled(Form)`
	padding-bottom: 80px;
	box-sizing: border-box;
	overflow-y: scroll;
	overflow-x: hidden;
	height: inherit;
`;

export const StyledButton = styled(Button)`
	&& {
		align-self: flex-end;
	}
`;

export const Headline = styled(Typography)``;

export const TypesGrid = styled(Grid)`
	margin-bottom: 30px;
`;

export const StyledIcon = styled(ArrowBack)`
	color: ${COLOR.WHITE};
`;

export const BackButton = styled.span`
	color: ${COLOR.SECONDARY_MAIN};
	color: ${COLOR.WHITE};
	margin-right: 15px;
	display: flex;
	text-decoration: none;
	line-height: 1;
	cursor: pointer;
`;

export const LoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-top: 100px;
	box-sizing: border-box;
`;

export const Container = styled.div`
	position: relative;
	height: 100%;
	overflow: hidden;
	flex: none;
`;

export const ButtonContainer = styled(Grid)`
	position: absolute;
	flex: none;
	bottom: 0;
	right: 40px;
	width: 100%;
	background: ${COLOR.LIGHT_GRAY};
	height: 80px;
	justify-content: center;
`;
