const convertDateToJavaFormat = (dateString) => {
    // Parse the input date string
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-indexed in JavaScript Date
    const day = parseInt(dateParts[2], 10);

    // Create a JavaScript Date object
    const date = new Date(Date.UTC(year, month, day));

    // Convert the Date object to an ISO 8601 string
    const isoDateString = date.toISOString();

    return isoDateString;
};

export default convertDateToJavaFormat;