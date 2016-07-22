# -*- coding: utf-8 -*-
##############################################################################
#
#     This file is part of web_composite_view, an Odoo module.
#
#     Copyright (c) 2016 Marcel Cojocaru
#
#     web_composite_view is free software: you can redistribute it and/or
#     modify it under the terms of the GNU Affero General Public License
#     as published by the Free Software Foundation, either version 3 of
#     the License, or (at your option) any later version.
#
#     web_composite_view is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU Affero General Public License for more details.
#
#     You should have received a copy of the
#     GNU Affero General Public License
#     along with web_expand_dialog.
#     If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    'name': "Web Composite View",

    'summary': """
        A module that shows an example to the user/developer how to build views composed of forms, trees, dialogs all together""",

    'author': "Cojocaru Marcel",
    'website': "",

    'category': 'web',
    'version': '8.0.0.1.0',
    'license': 'AGPL-3',

    'depends': [
	'crm',
	'web_calendar'
    ],
    'data': [
        'view/web_composite_view.xml',
    ],
    'installable': True,
}
