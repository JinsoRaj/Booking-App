frappe.ready(() => {
	let self = this;
	frappe.require("controls.bundle.js");

	$(".btn-schedule-eval").click((e) => {
		open_evaluation_form(e);
	});

	
});

///////////////



const open_evaluation_form = (e) => {
	this.eval_form = new frappe.ui.Dialog({
		title: __("Register Evaluation"),
		fields: [
			{
				fieldtype: "Link",
				fieldname: "game",
				label: __("Game"),
				options: "Game",
				reqd: 1,
				filter_description: " ",
				only_select: 1,
				change: () => {
					this.eval_form.set_value("date", "");
					$("[data-fieldname='slots']").html("");
				},
			},
			{
				fieldtype: "Date",
				fieldname: "date",
				label: __("Date"),
				reqd: 1,
				min_date: new Date(
					frappe.datetime.add_days(frappe.datetime.get_today(), 1)
				),
				max_date: evaluation_end_date
					? new Date(evaluation_end_date)
					: "",
				change: () => {
					if (this.eval_form.get_value("date")) get_slots();
				},
			},
			{
				fieldtype: "HTML",
				fieldname: "slots",
				label: __("Slots"),
			},
		],
		primary_action: (values) => {
			submit_evaluation_form(values);
		},
	});
	this.eval_form.show();
	setTimeout(() => {
		$(".modal-body").css("min-height", "300px");
	}, 1000);
};

const get_slots = () => {
	frappe.call({
		method: "booking_app.booking_app.doctype.game.game.get_schedule",
		args: {
			//course: this.eval_form.get_value("course"),
			date: this.eval_form.get_value("date"),
			//batch: $(".class-details").data("batch"),
		},
		callback: (r) => {
			if (r.message) {
				display_slots(r.message);
			}
		},
	});
};

const display_slots = (slots) => {
	let slot_html = "";
	let slots_available = false;
	if (slots.length) {
		slot_html = `<div>
			<div class="mb-2"> ${__("Select a Slot")} </div>
			<div class="slots-parent">`;
		let day = moment(this.eval_form.get_value("date")).format("dddd");

		slots.forEach((slot) => {
			if (slot.day == day) {
				slots_available = true;
				slot_html += `<div class="btn btn-sm btn-default slot" data-day="${
					slot.day
				}"
					data-start="${slot.start_time}" data-end="${slot.end_time}">
					${moment(slot.start_time, "hh:mm").format("hh:mm a")} -
					${moment(slot.end_time, "hh:mm").format("hh:mm a")}
				</div>`;
			}
		});
		slot_html += "</div> </div>";
	}

	if (!slots_available) {
		slot_html = `<div class="alert alert-danger" role="alert">
			No slots available for this date.
		</div>`;
	}

	$("[data-fieldname='slots']").html(slot_html);
};

const mark_active_slot = (e) => {
	$(".slot").removeClass("btn-outline-primary");
	$(e.currentTarget).addClass("btn-outline-primary");
	this.current_slot = $(e.currentTarget);
};

const submit_evaluation_form = (values) => {
	if (!this.current_slot) {
		frappe.throw(__("Please select a slot"));
	}

	// frappe.call({
	// 	method: "booking_app.booking_app.doctype.game_registration.game_registration.todooooocreate_certificate_request",
	// 	args: {
	// 		game: values.game,
	// 		date: values.date,
	// 		start_time: this.current_slot.data("start"),
	// 		end_time: this.current_slot.data("end"),
	// 		day: this.current_slot.data("day"),
	// 		batch_name: $(".class-details").data("batch"),
	// 	},
	// 	callback: (r) => {
	// 		this.eval_form.hide();
	// 		frappe.show_alert({
	// 			message: __("Evaluation scheduled successfully"),
	// 			indicator: "green",
	// 		});
	// 		setTimeout(() => {
	// 			window.location.reload();
	// 		}, 1000);
	// 	},
	// });
};