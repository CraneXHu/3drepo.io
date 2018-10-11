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
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import { COLOR } from "../../styles";

export const Container = styled.div``;

export const StyledTextField = styled(TextField)``;

export const StyledSelectField = styled(Select)``;

export const StyledSelectItem = styled(MenuItem)``;

export const StyledInputLabel = styled(InputLabel)``;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  && {
    margin-left: 14px;
  }
`;

export const FormContainer = styled(Grid)`
  padding: 24px;
`;

export const FieldsColumn = styled.div``;

export const FieldsRow = styled(Grid)`
  ${StyledTextField} {
    width: 100%;
  }

  > ${StyledTextField}:nth-child(1) {
    margin-right: 12px;
  }

  ${FieldsColumn}:nth-child(2n) {
    margin-left: 6px;
  }

  ${FieldsColumn}:nth-child(2n + 1) {
    margin-right: 6px;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FormInfoContainer = styled.div``;

export const FormInfo = styled.p`
  margin: 0 0 5px;
  font-size: 12px;
  color: ${COLOR.BLACK_40};
`;

export const PayPalLogo = styled.img`
  height: 20px;
`;