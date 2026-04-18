// Form submission
// pollForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     var title = document.getElementById("pollTitle").value;
//     var description = document.getElementById("pollDescription").value;
//     var options = Array.from(document.querySelectorAll(".poll-option")).map(function (inp) {
//         return inp.value.trim();
//     }).filter(function (val) {
//         return val.length > 0;
//     });

//     if (options.length < 2) {
//         alert("Please add at least 2 options");
//         return;
//     }

//     console.log({
//         title: title,
//         description: description,
//         options: options
//     });
//     alert("Poll created! (See console for details)");
// });
