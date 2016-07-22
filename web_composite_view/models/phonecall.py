# -*- coding: utf-8 -*-
from openerp import models, api

class phonecall(models.Model):

    _name = "crm.phonecall"
    _inherit = "crm.phonecall"

    @api.model
    def _get_default_composite_page_view_view(self):
        return self._get_default_form_view();
