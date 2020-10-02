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

import {TextFieldProps} from '@material-ui/core/TextField';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
	ButtonContainer,
	ButtonWrapper,
	Container,
	CopyIcon,
	StyledIconButton,
	StyledTextField
} from './copyableField.styles';

export const CopyableField: React.FunctionComponent<TextFieldProps> = ({value, ...props}) => (
	<Container>
		<StyledTextField {...props} value={value} fullWidth />
		<CopyToClipboard text={value}>
			<ButtonContainer>
				<ButtonWrapper>
					<StyledIconButton
						title="Copy to clipboard"
						disabled={!value}
					>
						<CopyIcon  />
					</StyledIconButton>
				</ButtonWrapper>
			</ButtonContainer>
		</CopyToClipboard>
	</Container>
);
