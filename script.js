const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectsParam = "objects";
const departmentsParam = "departments";
const searchParam = "search";


async function getBookIds(departmentIds = []) {

    let parseUrl = `${apiUrl}/${objectsParam}`
    if (departmentIds.length) {
        parseUrl += "?departmentIds="
        for (const departmentId of departmentIds) {
            parseUrl += departmentId + "|";
        }
    }

    let allBooks = null;
    try {
        const response = await fetch(parseUrl);
        allBooks = await response.json();
    } catch (e) {
        alert(e);
    }
    return allBooks
}

async function getBookInfo(bookId) {
    let bookInfo = null;
    try {
        const response = await fetch(`${apiUrl}/${objectsParam}/${bookId}`);
        bookInfo = await response.json();
    } catch (e) {
        alert(e);
    }
    return bookInfo;
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



