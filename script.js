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
    showLoadingSpinner("Preparing needed stuff");

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
    hideLoadingSpinner();
}

function showLoadingSpinner(message = "") {
    mainElement.classList.add("flex-center");
    loaderContainer.style.display = "block";
    userInputArea.hidden = true;
    objectsList.hidden = true;
    objectInfo.hidden = true;
    loaderLabel.textContent = message;
}

function hideLoadingSpinner() {
    mainElement.classList.remove("flex-center");
    loaderContainer.style.display = 'none';
    userInputArea.hidden = false;
    objectsList.hidden = false;
    objectInfo.hidden = false;
    loaderLabel.textContent = "";
}


const queryInput = document.querySelector("#query");
const departmentsSelect = document.querySelector("#departments");
const luckyBtn = document.querySelector("#lucky-button");
const searchBtn = document.querySelector("#search-button");

const objectsList = document.querySelector(".object-list__items");
const objectInfo = document.querySelector(".object-info__box");

const userInputArea = document.querySelector(".user-input");
const mainElement = document.querySelector("main");

const loaderContainer = document.querySelector(".loader-container");
const loaderLabel = document.querySelector(".loader-label");

getAllDepartments().then(r => fillDepartmentsSelect(r))