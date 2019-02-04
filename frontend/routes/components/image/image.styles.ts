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

import styled, { css } from 'styled-components';

const previewStateStyles = css`
	cursor: pointer;
	transition: opacity 200ms ease-in-out;

	&:hover {
		opacity: 0.8;
	}
`;

export const StyledImage = styled.img`
	width: 100%;
	min-height: 100px;
	object-fit: cover;
	${(props: any) => props.enablePreview && previewStateStyles}
` as any;
