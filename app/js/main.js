function filter(){
	$('#filter').on('change', function(){
		var filterBy = $(this).val();
		
		if(filterBy == 'responsavel'){
			$('#filter-data, #filter-sala').hide();
			$('#filter-responsavel').show();
		}else{
			if(filterBy == 'sala'){
				$('#filter-data, #filter-responsavel').hide();
				$('#filter-sala').show();
			}else{
				if(filterBy == 'data'){
					$('#filter-responsavel, #filter-sala').hide();
					$('#filter-data').show();
				}
			}
		}
	});
}

function datePicker(){
	$('#form-reservar #data, #filter-data').datepicker({
	    format: "dd/mm/yyyy",
	    weekStart: 0,
	    maxViewMode: 3,
	    todayBtn: "linked",
	    clearBtn: true,
	    language: "pt-BR",
	    orientation: "bottom right",
	    multidate: false,
	    daysOfWeekDisabled: "0",
	    daysOfWeekHighlighted: "0",
	    autoclose: true,
	    todayHighlight: true,
	    toggleActive: true
	});
}

$(document).ready(function () {
	filter();
	datePicker();
});