function datePicker(){$("#form-reservar input").datepicker({format:"dd/mm/yyyy",language:"pt-BR",weekStart:0,maxViewMode:2,todayBtn:"linked",clearBtn:!0,orientation:"bottom right",multidate:!1,daysOfWeekDisabled:"0",daysOfWeekHighlighted:"0",autoclose:!0,todayHighlight:!0})}function autoComplete(){$("#tokenfield").tokenfield({autocomplete:{source:["Bruno Klein","Guinter","Bruno Marques","Geison"],delay:100},showAutocompleteOnFocus:!1})}function clearFields(){$("#data").val("")}$(document).ready(function(){datePicker(),autoComplete(),$("#reset").click(function(){clearFields()})});