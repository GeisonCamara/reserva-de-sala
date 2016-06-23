$(document).ready(function () {
	$('#form-reservar input').datepicker({
	    format: "dd/mm/yyyy",
	    language: "pt-BR",
	    weekStart: 0,
	    maxViewMode: 2,
	    todayBtn: "linked",
	    clearBtn: true,
	    orientation: "bottom right",
	    multidate: false,
	    daysOfWeekDisabled: "0",
	    daysOfWeekHighlighted: "0",
	    autoclose: true,
	    todayHighlight: true
	});
});