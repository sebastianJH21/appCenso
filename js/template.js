function validatedForm() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('formCenso');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
};
// (function () {
//     'use strict';
//     document.querySelector('#save').addEventListener('click', function () {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         var forms = document.getElementsByClassName('formCenso');
//         // Loop over them and prevent submission
//         var validation = Array.prototype.filter.call(forms, function (form) {
//             form.addEventListener('submit', function (event) {
//                 if (form.checkValidity() === false) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false);
//         });
//     }, false);
// })();
let selectRow = null;
document.querySelector('.table').addEventListener('click', function (event) {
    let rows = document.getElementsByTagName('tr')
    console.log(rows)
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove('selected')
    }
    selectRow = event.target.parentNode;
    selectRow.classList.add('selected')
})
document.querySelector('.table').addEventListener('dblclick', function () {
    if (selectRow) {
        document.querySelector('#dni').value = selectRow.cells[0].textContent;
        document.querySelector('#name').value = selectRow.cells[1].textContent;
        document.querySelector('#dateBirth').value = selectRow.cells[2].textContent;
        document.querySelector('#address').value = selectRow.cells[3].textContent;
        document.querySelector('#phone').value = selectRow.cells[4].textContent;
        document.querySelector('#dateAppo').value = selectRow.cells[5].textContent;
        document.querySelector('#timeAppo').value = selectRow.cells[6].textContent;
        document.querySelector('.close-modal').click()
        if (!document.querySelector('#collapseWidthExample').classList.contains('show')) {
            document.querySelector('.btnSchedule').click()
        }
        document.querySelector('#save').classList.add('disable')
        document.querySelector('#edit').classList.remove('disable')
        document.querySelector('#delete').classList.remove('disable')
    }
})

function convertNumberToHours(number) {
    if (number > 12) {
        let hour = number - 12;
        let hours = Math.floor(hour);
        let minutes = Math.round((hour - hours) * 60)
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} pm`;
    } else {
        let hour = number;
        let hours = Math.floor(hour);
        let minutes = Math.round((hours - hour) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} am`;
    }
}
document.querySelector('#dateAppo').addEventListener('input', templateHourJob) // print hours
function templateHourJob() {
    let hourInitial = 8; //8:00 am
    let hourClosed;
    let templateHours = "";
    let dateAppo = new Date(document.querySelector('#dateAppo').value);
    if (dateAppo.getDay() <= 4) {
        hourClosed = 17;
    } else if (dateAppo.getDay() === 5) {
        hourClosed = 14;
    }
    for (let i = hourInitial; i <= hourClosed; i++) {
        templateHours += `
            <span class="hour">${convertNumberToHours(i)}</span>
        `
    }
    document.querySelector('.hours').innerHTML = templateHours;

    document.querySelectorAll('.hour').forEach(function (hour) {
        hour.addEventListener('click', function () {
            let time = parseInt(hour.textContent);
            if (time < 6) {
                time = `${(time + 12).toString().padStart(2, '0')}:00`
            } else {
                time = hour.textContent.substring(0, 5)
            }
            document.querySelector('#timeAppo').value = time;
        })
    })
}
function alertMsg(process) {
    let message = process ? "Process Successful" : "Process Unsuccessful"
    let type = process ? "success" : "danger"
    let template = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
    `;
    document.querySelector('.alterMsg').innerHTML = template;
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}





