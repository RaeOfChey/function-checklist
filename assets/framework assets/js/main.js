$(function() {
    // Add active class when the dropdown is interacted with
    $('#my-type').on('focus', function () {
        $(this).addClass('active'); // Add active class to the select element
    }).on('blur', function () {
        $(this).removeClass('active'); // Remove active class from the select element
    });

    // Optionally handle change event
    $('#my-type').on('change', function () {
        const selectedValue = $(this).val();
        console.log(`Selected function type: ${selectedValue}`);
        // Add any other actions you want to perform on change
    });
});
