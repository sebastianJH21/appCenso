
document.querySelector('.formCenso').addEventListener('submit', function (event) {
    event.preventDefault();
})
document.querySelector('.content-appo').addEventListener('submit', function (event) {
    event.preventDefault();
})

document.querySelector('.form-inline').addEventListener('submit', function (event) {
    event.preventDefault();
})
document.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () {
        switch (btn.id) {
            case "save":
                validatedForm();
                saveEditInformaction(1); // Function 1
                templateHourJob();
                break;
            case "edit":
                validatedForm();
                saveEditInformaction(2); // Function 2
                templateHourJob();
                break
            case "delete":
                validatedForm();
                deleteInformation(3); // Function 3
                templateHourJob();
                break;
            case "search":
                searchInformaction(4); // Function 4
                break;
            case "close-search":
                document.querySelector('#save').classList.remove('disable')
                document.querySelector('#edit').classList.add('disable')
                document.querySelector('#delete').classList.add('disable')
                document.querySelector('#filter').value = "";
                document.querySelector('#input-search').value = "";
                cleanAllFields();
                break;
        }
    })

})
function saveEditInformaction(action) {
    let dni = document.querySelector('#dni').value;
    let name = document.querySelector('#name').value;
    let dateBirth = document.querySelector('#dateBirth').value;
    let address = document.querySelector('#address').value;
    let phone = document.querySelector('#phone').value;
    let dateAppo = document.querySelector('#dateAppo').value;
    let timeAppo = document.querySelector('#timeAppo').value;


    let date = new Date(dateAppo + 'UTC-05:00');
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (dni != "" && name != "" && dateBirth != "" && address != "" && phone != "" && dateAppo != "" && timeAppo != "") {
        if (date >= today) {
            $.ajax({
                url: 'includes/functions.php',
                type: 'POST',
                data: {
                    "function": action,
                    "dni": dni,
                    "name": name,
                    "dateBirth": dateBirth,
                    "address": address,
                    "phone": phone,
                    "date": dateAppo,
                    "time": timeAppo
                },
                success: function (response) {
                    let answer = JSON.parse(response)
                    if (answer) {
                        alertMsg(true)
                        cleanAllFields();
                    } else {
                        alertMsg(false)
                    }
                }
            })
        } else {
            let template = `
                <div class="alert alert-danger" role="alert">
                    The date cannot to be less today.
                </div>
            `;
            document.querySelector('.alterMsg').innerHTML = template;
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 5000);
            return;
        }
    } else {
        if (!document.querySelector('#collapseWidthExample').classList.contains('show')) {
            document.querySelector('.btnSchedule').click();
        }
        setTimeout(() => {
            document.querySelector('#submitAppo').click()
        }, 300);
        return;
    }
}
function deleteInformation(action) {
    let dni = document.querySelector('#dni').value;
    if (dni != "") {
        $.ajax({
            url: 'includes/functions.php',
            type: 'POST',
            data: {
                "function": action,
                "dni": dni,
            },
            success: function (response) {
                let answer = JSON.parse(response)
                if(answer){
                    alertMsg(true)
                    cleanAllFields()
                    document.querySelector('#save').classList.remove('disable')
                    document.querySelector('#edit').classList.add('disable')
                    document.querySelector('#delete').classList.add('disable')
                }else{
                    alertMsg(false)
                }
            }
        })
    } else {
        return;
    }
}
function searchInformaction(action) {
    let filter = document.querySelector('#filter').value;
    let search = document.querySelector('#input-search').value;
    if (filter != "" && search != "") {
        $.ajax({
            url: 'includes/functions.php',
            type: 'POST',
            data: {
                "function": action,
                "filter": filter,
                "textFilter": search,
            },
            success: function (response) {
                let answer = JSON.parse(response)
                if (answer[0]) {
                    let rows = answer.slice(1);
                    $('.tableBody').empty()
                    let templateSearch = "";
                    rows.forEach(function (element) {
                        templateSearch += `
                            <tr>
                              <th scope="row">${element["dni"]}</th>
                              <td>${element["name"]}</td>
                              <td>${element["dateBirth"]}</td>
                              <td>${element["address"]}</td>
                              <td>${element["phone"]}</td>
                              <td>${element["dateAppo"]}</td>
                              <td>${element["timeAppo"]}</td>
                            </tr>
                        `
                    })
                    $('.tableBody').html(templateSearch)
                    $('.btn-modal').click();
                } else {
                    alertMsg(false)
                }
            }
        });
    } else {
        return
    }
}
function cleanAllFields() {
    document.querySelector('#dni').value = "";
    document.querySelector('#name').value = "";
    document.querySelector('#dateBirth').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#phone').value = "";
    document.querySelector('#dateAppo').value = "";
    document.querySelector('#timeAppo').value = "";
}