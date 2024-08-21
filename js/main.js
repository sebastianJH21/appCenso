
    document.querySelector('.formCenso').addEventListener('submit',function(event){
        event.preventDefault();
    })
    document.querySelector('.content-appo').addEventListener('submit',function(event){
        event.preventDefault();
    })

document.querySelector('.form-inline').addEventListener('submit',function(event){
    event.preventDefault();
})
document.querySelectorAll('button').forEach(function(btn){
    btn.addEventListener('click',function(){
        switch(btn.id){
            case "save":
                console.log(1)
                validatedForm();
                saveEditInformaction(1); // Function 1
                break;
            case "edit":
                validatedForm();
                saveEditInformaction(2); // Function 2
                break
            case "delete":
                validatedForm();
                deleteInformation(3); // Function 3
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
function saveEditInformaction(action){
    console.log(2)
    let dni = document.querySelector('#dni').value;
    let name = document.querySelector('#name').value;
    let dateBirth = document.querySelector('#dateBirth').value;
    let address = document.querySelector('#address').value;
    let phone = document.querySelector('#phone').value;
    let dateAppo = document.querySelector('#dateAppo').value;
    let timeAppo = document.querySelector('#timeAppo').value;
    if(dni != "" && name != "" && dateBirth != "" && address != "" && phone != "" && dateAppo != "" && timeAppo != ""){
        console.log(3)
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
            success:function(response){
                let answer = JSON.parse(response)
                if(answer){
                    alertMsg(true)
                    cleanAllFields();
                }else{
                    alertMsg(false)
                }
            }
        })
    }else{
        if(!document.querySelector('#collapseWidthExample').classList.contains('show')){
            setTimeout(() => {
                document.querySelector('#submitAppo').click()
            }, 300);
            document.querySelector('.btnSchedule').click();
            console.log(0)
        } 
        return;
    }
}
function deleteInformation(action){
    let dni = document.querySelector('#dni').value;
    if(dni != ""){
        $.ajax({
            url: 'includes/functions.php',
            type: 'POST',
            data: {
                "function": action,
                "dni": dni,
            },
            success:function(response){
                let answer = JSON.parse(response)
                answer ? alertMsg(true) : alertMsg(false)
            }
        })
    }else{
        return;
    }
}
function searchInformaction(action){
    let filter = document.querySelector('#filter').value;
    let search = document.querySelector('#input-search').value;
    if(filter != "" && search != ""){
        $.ajax({
            url: 'includes/functions.php',
            type: 'POST',
            data: {
                "function": action,
                "filter": filter,
                "textFilter": search,
            },
            success:function(response){
                let answer = JSON.parse(response)
                if(answer[0]){
                    let rows = answer.slice(1);
                    console.log(rows)
                    $('.tableBody').empty()
                    let templateSearch = "";
                    rows.forEach(function(element){
                        templateSearch +=`
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
                }else{
                    alertMsg(false)
                }
            }
        });
    }else{
        return
    }
}
function cleanAllFields(){
    document.querySelector('#dni').value = "";
    document.querySelector('#name').value = "";
    document.querySelector('#dateBirth').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#phone').value = "";
    document.querySelector('#dateAppo').value = "";
    document.querySelector('#timeAppo').value = "";
}