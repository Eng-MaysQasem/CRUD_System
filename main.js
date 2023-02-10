var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var addBtn = document.getElementById('addBtn');
var tableBody = document.getElementById('tableBody');
if (JSON.parse(localStorage.getItem('courses')) == null) {
    courses = [];
} else {
    courses = JSON.parse(localStorage.getItem('courses'));
}

display();
var tableBody = document.getElementById('tableBody');
var deleteBtn = document.getElementById('deleteBtn');
var search = document.getElementById('search');
var currentIndex = '';

addBtn.onclick = function(event) {
        event.preventDefault();
        if (addBtn.innerHTML == 'Add Course') {
            addCourse();

        } else if (addBtn.innerHTML = 'Update course') {
            UpdateCourse();

        }
    }
    //add
function addCourse() {
    console.log("hello");
    var course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value
    }
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    clearInputs();
    display();

    Swal.fire(

        'course added!',
        'success'
    )
}


//clear

function clearInputs() {
    courseName.value = '';
    courseCategory.value = '';
    coursePrice.value = '';
    courseDescription.value = '';
    courseName.classList.remove('is-valid');
    coursePrice.classList.remove('is-valid');
    courseDescription.classList.remove('is-valid');
    courseCategory.classList.remove('is-valid');
}
//display

function display() {
    var data = '';
    for (var i = 0; i < courses.length; i++) {
        data += `
        <tr>
        <td>${i}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td>
        <a href="#"  class="btn btn-outline-primary" onclick="editCourse(${i})">edit</a>
        </td>
        <td>
        <a href="#" class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</a>
        </td>
         </tr>
        `
    }
    tableBody.innerHTML = data;
}
//delete course
function deleteCourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));

            display();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


}
//delete all
deleteBtn.onclick = function deleteAll() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                courses = [];
                tableBody.innerHTML = '';
                localStorage.setItem('courses', JSON.stringify(courses));

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }
    //search 
function searchCourses() {
    console.log(search.value);
    var searchKey = search.value;

    var data = '';
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].category.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].description.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())) {
            data += `
        <tr>
        <td>${i}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td>
        <a href="#" class="btn btn outline primary ">edit</a>
        </td>
        <td>
        <a href="#" class="btn btn outline danger " onclick="deleteCourse(${i})">delete</a>
        </td>
         </tr>
        `
        }
        tableBody.innerHTML = data;
    }

}

//edit
function editCourse(index) {
    console.log(courses[index]);
    courseName.value = courses[index].name;
    courseCategory.value = courses[index].category;
    coursePrice.value = courses[index].price;
    courseDescription.value = courses[index].description;
    addBtn.innerHTML = 'Update course';
    currentIndex = index;
} //update
function UpdateCourse() {
    var course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value
    }
    var oldName = courses[currentIndex].name;
    courses[currentIndex] = course;
    display();
    localStorage.setItem('courses', JSON.stringify(courses));
    clearInputs();
    addBtn.innerHTML = 'Add Course';
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${oldName} Course has been updated!`,
        showConfirmButton: false,
        timer: 1500
    })
}
//validation
//regex
//courseName
//first latter capital
//name 3-10
//no numbers
courseName.onkeyup = function() {
        pattern = /^[A-Z][a-z]{2,10}$/;
        if (pattern.test(courseName.value)) {
            courseName.classList.add('is-valid');
            courseName.classList.remove('is-invalid');
            addBtn.removeAttribute('disabled');

        } else {
            courseName.classList.add('is-invalid');
            courseName.classList.remove('invalid');
            addBtn.setAttribute('disabled', 'disabled');


        }
    }
    //validation
    //regex
    //courseCategory
    //first latter capital
    //name 3-20
    //accept spaces
    //no numbers
courseCategory.onkeyup = function() {
        pattern = /^[A-Z][a-z\s]{2,20}$/;
        if (pattern.test(courseCategory.value)) {
            courseCategory.classList.add('is-valid');
            courseCategory.classList.remove('is-invalid');
            addBtn.removeAttribute('disabled');

        } else {
            courseCategory.classList.add('is-invalid');
            courseCategory.classList.remove('invalid');
            addBtn.setAttribute('disabled', 'disabled');


        }
    }
    //validation
    //regex
    //coursePrice
    //numeric
    //4digits

coursePrice.onkeyup = function() {
        pattern = /^[0-9]{1,4}$/;
        if (pattern.test(coursePrice.value)) {
            coursePrice.classList.add('is-valid');
            coursePrice.classList.remove('is-invalid');
            addBtn.removeAttribute('disabled');

        } else {
            coursePrice.classList.add('is-invalid');
            coursePrice.classList.remove('invalid');
            addBtn.setAttribute('disabled', 'disabled');


        }
    }
    //validation
    //regex
    //courseDescription
    //first latter capital
    //name 1-60
    //accept spaces
    //no numbers
courseDescription.onkeyup = function() {
    pattern = /^[A-Za-z0-9\s]{1,60}$/;
    if (pattern.test(courseDescription.value)) {
        courseDescription.classList.add('is-valid');
        courseDescription.classList.remove('is-invalid');
        addBtn.removeAttribute('disabled');

    } else {
        courseDescription.classList.add('is-invalid');
        courseDescription.classList.remove('invalid');
        addBtn.setAttribute('disabled', 'disabled');


    }
}