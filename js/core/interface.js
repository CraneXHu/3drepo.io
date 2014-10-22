/**
 *  Copyright (C) 2014 3D Repo Ltd 
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

var config = require('app-config').config;

exports.index  = function(xmltemplate, db_name, format, revision, res, err_callback) {
	if (revision != null)
		xml_str = '<inline url="' + db_name +'.' + format + '.x3d/' + revision + '"/> </inline>';
	else
		xml_str = '<inline url="' + db_name +'.' + format + '.x3d"/> </inline>';

	res.render(xmltemplate, {
		xml: xml_str,
		x3domjs: config.external.x3domjs,
		x3domcss: config.external.x3domcss,
		repouicss: config.external.repouicss,
        repo: [], // db_list,
        objs: JSON.stringify({}) // json
    });
};



