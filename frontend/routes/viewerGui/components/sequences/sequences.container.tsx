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

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedDate, selectSelectedFrame,
	selectSelectedMaxDate, selectSelectedMinDate, selectSequences, SequencesActions } from '../../../../modules/sequences';

import { Sequences } from './sequences.component';

const mapStateToProps = createStructuredSelector({
	sequences: selectSequences,
	minDate: selectSelectedMinDate,
	maxDate: selectSelectedMaxDate,
	selectedDate: selectSelectedDate,
	selectedFrame: selectSelectedFrame
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
	fetchSequences: SequencesActions.fetchSequences,
	setSelectedDate: SequencesActions.setSelectedDate
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sequences));