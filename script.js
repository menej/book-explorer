const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectsParam = "objects";
const departmentsParam = "departments";
const searchParam = "search";

let searchHistory = [];

async function getObjectIds(departmentIds = []) {

    let parseUrl = `${apiUrl}/${objectsParam}`
    if (departmentIds.length) {
        parseUrl += "?departmentIds="
        for (const departmentId of departmentIds) {
            parseUrl += departmentId + "|";
        }
    }

    let allObjects = null;
    try {
        const response = await fetch(parseUrl);
        allObjects = await response.json();
    } catch (e) {
        alert(e);
    }
    return allObjects
}

async function getObjectInfo(objectId) {
    let objectInfo = null;
    try {
        const response = await fetch(`${apiUrl}/${objectsParam}/${objectId}`);
        objectInfo = await response.json();
    } catch (e) {
        alert(e);
    }
    return objectInfo;
}

async function getAllDepartments() {
    let allDepartments = null;
    try {
        const response = await fetch(`${apiUrl}/${departmentsParam}`);
        allDepartments = await response.json();
    } catch (e) {
        alert(e);
    }
    return allDepartments;
}

function displayNewMuseumObject() {

}

function fillDepartmentsSelect(departmentsJson) {
    let departments = departmentsJson["departments"];

    departments = departments.sort((a, b) => a.displayName.localeCompare(b.displayName));

    // Add all departments option
    let option = document.createElement("option");
    option.setAttribute("value", "-1");
    option.textContent = "All departments";
    departmentsSelect.appendChild(option);

    // Fill with other departments options
    for (const department of departments) {
        let departmentOption = document.createElement("option");
        departmentOption.setAttribute("value", department["departmentId"]);
        departmentOption.textContent = department["displayName"];
        departmentsSelect.appendChild(departmentOption);
    }

}


const queryInput = document.querySelector("#query");
const departmentsSelect = document.querySelector("#departments");
const luckyBtn = document.querySelector("#lucky-button");
const searchBtn = document.querySelector("#search-button");

const objectsList = document.querySelector(".object-list__items");
const objectInfo = document.querySelector(".object-info__box");

getAllDepartments().then(r => fillDepartmentsSelect(r))
