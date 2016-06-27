function datePicker(){
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
}

function autoComplete(){
	$('#tokenfield').tokenfield({
		autocomplete: {
			source: ['Bruno Klein','Guinter','Bruno Marques','Geison'],
			delay: 100
		},
		showAutocompleteOnFocus: false
	});
}

function clearFields(){
	$('#data').val('');
}

$(document).ready(function () {
	datePicker();
	autoComplete();
	$('#reset').click(function(){
		clearFields();
	});
});