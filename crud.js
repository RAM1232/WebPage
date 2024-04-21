const preExistingData = [
    {
        name: "John Doe",
        company: "ABC Inc.",
        designation: "Manager",
        phone: "1234567890",
        email: "john.doe@example.com"
    },
    {
        name: "Jane Smith",
        company: "XYZ Corp.",
        designation: "Engineer",
        phone: "9876543210",
        email: "jane.smith@example.com"
    },
    {
        name: "Angela Yu",
        company: "ABC_INCORP",
        designation: "SDE",
        phone: "9009009870",
        email: "angeliayu@abc.corp"
    }
];
let editingIndex = -1;
function populateTableWithPreExistingData() {
    const tableBody = document.querySelector("#contactTable tbody");
    let html = "";
    preExistingData.forEach((contact, index) => {
        const serialNumber = index + 1;
        html += `
            <tr>
                <td>${serialNumber}</td>
                <td>${contact.name}</td>
                <td>${contact.company}</td>
                <td>${contact.designation}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td class="edit-icon" onclick="editContact(${index})">Edit</td>
                <td class="delete-icon" onclick="deleteContact(${index})">Delete</td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
}
function addOrEditContact(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value.trim();
    const company =document.getElementById("company").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const phone = document.getElementById("phone").value.replace(/-/g, '').trim();
    const email = document.getElementById("email").value.trim();
    const newContact = { name, company, designation, phone, email };

    if (editingIndex === -1) {
        preExistingData.push(newContact);
    } else {
        preExistingData[editingIndex] = newContact;
        document.getElementById("submitContactBtn").innerText = "Add Contact"; 
    }

    populateTableWithPreExistingData(); 
    document.getElementById("contactForm").reset();
}

function editContact(index) {
    editingIndex = index;
    const contact = preExistingData[index];

    document.getElementById("name").value = contact.name;
    document.getElementById("company").value = contact.company;
    document.getElementById("designation").value = contact.designation;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;

    document.getElementById("submitContactBtn").innerText = "Save";
}
function deleteContact(index) {
    const confirmation = confirm("Do you want to Delete the Entire Row??");
    if (confirmation) {
        preExistingData.splice(index, 1);
        populateTableWithPreExistingData(); 
    }
}
document.getElementById("contactForm").addEventListener('submit', function(event) {
    addOrEditContact(event);
});
populateTableWithPreExistingData();

