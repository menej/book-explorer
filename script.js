const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectsParam = "objects";
const departmentsParam = "departments";
const searchParam = "search";


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

getObjectInfo(100).then(r => console.log(r));