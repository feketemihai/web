openerp.web_composite_view = function(instance, local) {

	local.CustomFormView = instance.web.FormView.extend({
		display_name: 'custom_form',

		init: function(parent, dataset, view_id, options) {
		    if (!view_id) {
		        view_id = dataset.context.view_id;
		    }
		    this._super.apply(this, arguments);
		}
	});
	instance.web.views.add('custom_form', 'instance.web_composite_view.CustomFormView');

	local.CustomCalendarView = instance.web_calendar.CalendarView.extend({
		display_name: 'custom_calendar',

		init: function(parent, dataset, view_id, options) {
		    if (!view_id) {
		        view_id = dataset.context.view_id;
		    }
		    this._super.apply(this, arguments);
		}
    	});
    	instance.web.views.add('custom_calendar', 'instance.web_composite_view.CustomCalendarView');


	local.CustomListView = instance.web.ListView.extend({
		display_name: 'custom_tree',

		init: function(parent, dataset, view_id, options) {
			var self = this;
			if (!view_id) {
				view_id = dataset.context.view_id;
			}
			this._super(parent, dataset, view_id, options);
		}
	});
    	instance.web.views.add('custom_tree', 'instance.web_composite_view.CustomListView');

	////////////////

	local.CompositePageView = instance.web.View.extend({
		display_name: 'composite_page_view',

		init: function (parent, dataset, view_id, options) {
			this._super(parent);
			this.dataset = dataset;
			this.model = dataset.model;
			this.fields_view = {};
			this.view_id = view_id;
			this.view_type = 'composite_page_view';
			this.ctx = this.dataset.context;
			this._init_views();
		},

		has_uncommitted_changes: function() {
			return false;
		},

		_init_views: function() {
			var self = this;

			var form_action_id =  this.ctx.form_view_action_id;
			this.action_manager_form = new instance.web.ActionManager(this);
			this.action_manager_form.do_action(form_action_id).then(function() {
				self.custom_form = self.action_manager_form.inner_widget.views.custom_form.controller;
				return self._read_slice(self.custom_form);

			}).then(function(){
				self._do_show(self.custom_form);
			});

			//////////////

			var tree_action_id =  this.ctx.tree_view_action_id;
			this.action_manager_tree = new instance.web.ActionManager(this);
			this.action_manager_tree.do_action(tree_action_id).then(function() {
				self.custom_tree = self.action_manager_tree.inner_widget.views.custom_tree.controller;
				return self._read_slice(self.custom_tree);

			}).then(function(){
				self._do_show(self.custom_tree);
			});

			/////////

			var calendar_action_id =  self.ctx.calendar_view_action_id;
			this.action_manager_calendar = new instance.web.ActionManager(self);
			this.action_manager_calendar.do_action(calendar_action_id).then(function() {
				self.custom_calendar = self.action_manager_calendar.inner_widget.views.custom_calendar.controller;
				return self._read_slice(self.custom_calendar);
			}).then(function(){
				self._do_show(self.custom_calendar);
			});
		},

		 _read_slice: function(custom_view) {
			var fields = [];
			for (f in custom_view.fields) {
				fields.push(f);
			}

			return custom_view.dataset.read_slice(fields, {});
		},

		_do_show: function(custom_view) {
			if (custom_view.dataset.size() > 0) {
				custom_view.dataset.index = 0;
				return custom_view.do_show();
			}
			return $.when();
		},

		start: function() {
			this._super();
			var self = this;

			self.action_manager_form.appendTo(self.$el);
			self.action_manager_form.$el.attr("id", "custom_form");

			this.action_manager_tree.appendTo(self.$el);
			this.action_manager_tree.$el.attr("id", "custom_tree");

			this.action_manager_calendar.appendTo(this.$el);
			this.action_manager_calendar.$el.attr("id", "custom_calendar");
		}
	});

	instance.web.views.add('composite_page_view', 'instance.web_composite_view.CompositePageView');
};
