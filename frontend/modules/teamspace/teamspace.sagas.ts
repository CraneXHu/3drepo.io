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

import { put, takeLatest } from 'redux-saga/effects';

import * as API from '../../services/api';
import { clientConfigService } from '../../services/clientConfig';
import { DialogActions } from '../dialog';
import { uploadFileStatuses } from '../model/model.helpers';
import { SnackbarActions } from '../snackbar';
import { TeamspaceActions, TeamspaceTypes } from './';

export function* fetchSettings({ teamspace }) {
	try {
		yield put(TeamspaceActions.setPendingState(true));
		const { data } = yield API.fetchTeamspaceSettings(teamspace);

		yield put(TeamspaceActions.fetchSettingsSuccess(data));
		yield put(TeamspaceActions.setPendingState(false));
	} catch (e) {
		yield put(DialogActions.showEndpointErrorDialog('fetch', 'teamspace settings', e));
	}
}

export function* updateSettings({ teamspace, settings: { file, ...settings} }) {
	try {
		const { data } = yield API.editTeamspaceSettings(teamspace, settings);
		yield put(TeamspaceActions.fetchSettingsSuccess(data));
		yield put(SnackbarActions.show('Updated teamspace settings'));
		console.warn('file:', file);

		if (file) {
			yield put(TeamspaceActions.uploadTreatmentsFile(teamspace, file));
		}
	} catch (e) {
		yield put(DialogActions.showEndpointErrorDialog('update', 'teamspace settings', e));
	}
}

export function* uploadTreatmentsFile({ teamspace, file }) {
	try {
		if (file.size > clientConfigService.uploadSizeLimit) {
			const size = clientConfigService.uploadSizeLimit / 1048576 as any;
			const maxSize = parseInt(size, 10).toFixed(0);
			const MAX_SIZE_MESSAGE = `File exceeds size limit of ${maxSize}mb`;

			yield put(SnackbarActions.show(MAX_SIZE_MESSAGE));
		} else {
			const formData = new FormData();
			formData.append('file', file);

			const { data: { status }, data } = yield API.uploadTreatmentsFile(teamspace, file);
			console.warn('status:', status);

			if (status === uploadFileStatuses.ok) {
				if (data.hasOwnProperty('errorReason') && data.errorReason.message) {
					yield put(SnackbarActions.show(data.errorReason.message));
				} else {
					yield put(SnackbarActions.show(`Treatments file uploaded successfully`));
				}
			}
			if (status === uploadFileStatuses.failed) {
				if (data.hasOwnProperty('errorReason') && data.errorReason.message) {
					yield put(SnackbarActions.show(`Failed to import treatments file: ${data.errorReason.message}`));
				} else {
					yield put(SnackbarActions.show(`Failed to import treatments file`));
				}
			}
		}
	} catch (e) {
		yield put(DialogActions.showEndpointErrorDialog('upload', 'treatments', e));
	}
}

export function* downloadTreatmentsTemplate({ teamspace }) {
	try {
		const { data } = yield API.fetchTreatmentsFile(teamspace);
console.warn('data:', data);
		if (data) {
			const content = JSON.stringify(data, null, 2);
			const a = document.createElement('a');
			const file = new Blob([content]);
			a.href = URL.createObjectURL(file);
			a.download = `treatments.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}

	} catch (e) {
		// yield put(DialogActions.showEndpointErrorDialog('update', 'teamspace settings', e));
	}
}

export default function* TeamspaceSaga() {
	yield takeLatest(TeamspaceTypes.FETCH_SETTINGS, fetchSettings);
	yield takeLatest(TeamspaceTypes.UPDATE_SETTINGS, updateSettings);
	yield takeLatest(TeamspaceTypes.UPLOAD_TREATMENTS_FILE, uploadTreatmentsFile);
	yield takeLatest(TeamspaceTypes.DOWNLOAD_TREATMENTS_TEMPLATE, downloadTreatmentsTemplate);
}
