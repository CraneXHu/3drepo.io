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

import React from 'react';

import { StarIcon } from '../../../../../components/starIcon/starIcon.component';
import { Container, MetaKey, MetaKeyText, MetaValue, StarIconWrapper  } from './metaRecord.styles';

interface IProps {
	starred: boolean;
	name: string;
	className?: string;
	value?: string;
	onStarClick: () => void;
}

interface IState {
	hasDelayedClick: boolean;
}

export class MetaRecord extends React.PureComponent<IProps, IState> {
	public state = {
		hasDelayedClick: false
	};

	private get isStarred() {
		const { starred } = this.props;

		if (this.state.hasDelayedClick) {
			return !starred;
		}

		return starred;
	}

	private starClickTimeout = null;

	public componentDidUpdate(prevProps) {
		if (prevProps.starred !== this.props.starred) {
			this.resetStarClickTimeout();
		}
	}

	public render() {
		const { value, name } = this.props;

		return (
			<Container className={this.props.className}>
				<MetaKey>
					<StarIconWrapper>
						<StarIcon
							active={this.isStarred}
							onClick={this.handleStarClick}
						/>
					</StarIconWrapper>
					<MetaKeyText>{name}</MetaKeyText>
				</MetaKey>
				<MetaValue>{value}</MetaValue>
			</Container>
		);
	}

	private handleStarClick = () => {
		if (this.starClickTimeout) {
			this.resetStarClickTimeout();
		} else {
			this.setState({ hasDelayedClick: true }, () => {
				this.starClickTimeout = setTimeout(() => {
					this.props.onStarClick();
				}, 2000);
			});
		}
	}

	private resetStarClickTimeout = () => {
		this.setState({ hasDelayedClick: false }, () => {
			clearTimeout(this.starClickTimeout);
			this.starClickTimeout = null;
		});
	}
}
