const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectsParam = "objects";
const departmentsParam = "departments";
const searchParam = "search";

let objectIdsCache = null;


// Spinner control functions
function showLoadingSpinner(message = "") {
    mainElement.classList.add("flex-center");
    loaderContainer.style.display = "block";
    userInputArea.hidden = true;
    objectsList.hidden = true;
    objectInfoBox.hidden = true;
    loaderLabel.textContent = message;
}

function hideLoadingSpinner() {
    mainElement.classList.remove("flex-center");
    loaderContainer.style.display = 'none';
    userInputArea.hidden = false;
    objectsList.hidden = false;
    objectInfoBox.hidden = false;
    loaderLabel.textContent = "";
}

// Api services functions
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

// Other functions
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

async function showLuckyResult() {
    if (objectIdsCache == null) {
        showLoadingSpinner("Fetching data about objects");
        objectIdsCache = await getObjectIds();
    }

    showLoadingSpinner("Getting your object ready")

    let totalIds = objectIdsCache["total"];
    let chosenIndex = getRandomInt(totalIds);
    let chosenId = objectIdsCache["objectIDs"][chosenIndex];

    let objectInfo = await getObjectInfo(chosenId);
    console.log(objectInfo);
    objectInfoBox.removeChild(objectInfoBox.firstChild);

    let museumObject = new MuseumObject(
        objectInfo.objectID, objectInfo.title, objectInfo.objectName, objectInfo.medium, objectInfo.dimensions,
        objectInfo.period, objectInfo.city, objectInfo.state, objectInfo.county, objectInfo.country, objectInfo.culture,
        objectInfo.dynasty, objectInfo.reign, objectInfo.linkResource, objectInfo.objectWikidata_URL,
        objectInfo.primaryImage, objectInfo.primaryImageSmall, objectInfo.additionalImages, objectInfo.department,
        objectInfo.accessionYear, objectInfo.repository, objectInfo.metadataDate, objectInfo.isHighlight,
        objectInfo.isPublicDomain, objectInfo.artistDisplayName, objectInfo.artistDisplayBio,
        objectInfo.artistNationality, objectInfo.artistBeginDate, objectInfo.artistEndDate,
        objectInfo.artistWikidata_URL
    )

    let objectImage = document.createElement("img");
    objectImage.setAttribute("src", museumObject.primaryImage);

    objectInfoBox.appendChild(objectImage);

    hideLoadingSpinner();
}

// Utility functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Globals
const queryInput = document.querySelector("#query");
const departmentsSelect = document.querySelector("#departments");
const luckyBtn = document.querySelector("#lucky-button");
const searchBtn = document.querySelector("#search-button");

const objectsList = document.querySelector(".object-list__items");
const objectInfoBox = document.querySelector(".object-info__box");

const userInputArea = document.querySelector(".user-input");
const mainElement = document.querySelector("main");

const loaderContainer = document.querySelector(".loader-container");
const loaderLabel = document.querySelector(".loader-label");

luckyBtn.addEventListener("click", () => showLuckyResult());

document.addEventListener("DOMContentLoaded", e => {
    getAllDepartments().then(r => fillDepartmentsSelect(r))
});
