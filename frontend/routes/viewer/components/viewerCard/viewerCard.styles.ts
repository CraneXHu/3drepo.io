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

import styled from 'styled-components';
import { COLOR } from '../../../../styles/colors';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  && {
    button {
      color: ${COLOR.WHITE};

      &:disabled {
        color: ${COLOR.GRAY};
      }
    }

    position: absolute;
    left: 0;
    right: 0;
    top: -4px;
  }
`;

export const Title = styled.div`
  align-items: center;
  display: flex;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
`;

export const Action = styled.span`
  color: ${COLOR.WHITE};
`;

export const TitleIcon = styled.div`
  align-self: center;
  height: 100%;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ViewCardContent = styled.div`
  background-color: ${COLOR.WHITE_87};
  padding: 24px;
`;

export const ViewCardFooter = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 24px;
  padding: 8px 24px;
  border-top: 1px solid ${COLOR.BLACK_20};
  display: flex;
`;
