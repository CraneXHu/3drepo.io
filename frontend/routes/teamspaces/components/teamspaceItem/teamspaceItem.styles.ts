import { Avatar as AvatarComponent } from '@material-ui/core';
import styled from 'styled-components';
import { COLOR } from '../../../../styles';

const DEFAULT_AVATAR_SIZE = 30;

export const OwnerData = styled.div`
	font-size: 14px;
	width: 100%;
	color: ${COLOR.DARK_GRAY};
`;

export const Avatar = styled(AvatarComponent)`
	&& {
		height: ${(props) => props.size || DEFAULT_AVATAR_SIZE}px;
		width: ${(props) => props.size || DEFAULT_AVATAR_SIZE}px;
		background-color: ${(props) => !props.src ? COLOR.BLACK_20 : `transparent`};
		color: ${COLOR.WHITE};
		font-size: ${(props) => Math.round((props.size || DEFAULT_AVATAR_SIZE) * 14 / DEFAULT_AVATAR_SIZE)}px;
	}
`;