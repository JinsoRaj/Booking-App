// Copyright (c) 2024, Hashiq and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Game Registration", {
// 	refresh(frm) {

// 	},
// });
// let d = new frappe.ui.Dialog({
//     title: 'Enter details',
//     fields: [
//         {
//             fieldtype: "Link",
//             fieldname: "game",
//             label: __("Game"),
//             options: "Game",
//             reqd: 1,
//             filter_description: " ",
//             only_select: 1,
//             change: () => {
//                 frm.set_value("date", "");
//                 $("[data-fieldname='slots']").html("");
//             },
//         },
//         {
//             fieldtype: "Date",
//             fieldname: "date",
//             label: __("Date"),
//             reqd: 1,
//             min_date: new Date(
//                 frappe.datetime.add_days(frappe.datetime.get_today(), 1)
//             ),
//             //max_date: new Date( frappe.datetime.add_days(frappe.datetime.get_today(), 7) ),
//             change: () => {
//                 //if (this.eval_form.get_value("date")) get_slots();
//             },
//         },
//         {
//             fieldtype: "HTML",
//             fieldname: "slots",
//             label: __("Slots"),
//         },
//     ],
//     size: 'small', // small, large, extra-large 
//     primary_action_label: 'Submit',
//     primary_action(values) {
//         console.log(values);
//         d.hide();
//     }
// });

frappe.ui.form.on('Game Registration', {
    refresh: function(frm) {
        //console.log(frm);
      frm.add_custom_button(__('Register Evaluation'), function(){
        //frappe.msgprint(frm.doc.game);
        let d = new frappe.ui.Dialog({
            title: 'Enter details',
            fields: [
                {
                    fieldtype: "Link",
                    fieldname: "game",
                    label: __("Game"),
                    options: "Game",
                    reqd: 1,
                    filter_description: " ",
                    only_select: 1,
                    onchange: () => {
                        //frm.set_value("date", "");
                        //frm.save();
                        //frm.doc.date = "";
                        //$("[data-fieldname='slots']").html("");
                        console.log(cur_dialog.fields_dict.date.set_value("").then(function() {
                            // Do something after the value is set
                            console.log('Field 2 value has been reset');
                            $("[data-fieldname='slots']").html("");
                        }) );
                        //frm.refresh_fields();
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
                    //max_date: new Date( frappe.datetime.add_days(frappe.datetime.get_today(), 7) ),
                    onchange: () => {
                        if (cur_dialog.fields_dict.date.get_value("date")){
                            get_slots(); //Todooooo00
                        }
                    },
                },
                {
                    fieldtype: "HTML",
                    fieldname: "slots",
                    label: __("Slots"),
                },
            ],
            size: 'small', // small, large, extra-large 
            primary_action_label: 'Submit',
            primary_action(values) {
                console.log(values);
                d.hide();
            }
        });
        d.show()
    });
   }
});
