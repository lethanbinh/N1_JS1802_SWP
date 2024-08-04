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

export function convertJavaDateToJSDate(javaDateString) {
    // Ensure the Java date string is in ISO format
    const isoDateString = javaDateString
        .replace('T', ' ') // Replace 'T' with a space
        .replace('Z', '')  // Remove 'Z' if present
        .replace(/-/g, '/') // Replace dashes with slashes for Safari compatibility
        .replace(/\.\d+/, ''); // Remove milliseconds if present

    // Create and return the JavaScript Date object
    return new Date(isoDateString);
}
 
export default convertDateToJavaFormat;

export function getCurrentDateFormatted() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

export function getCurrentDateTimeFormatted() {
    const date = new Date();
    
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Format date and time
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function convertToJavaDateUtil(dateString) {
    // Tạo đối tượng Date từ chuỗi ngày
    const date = new Date(dateString);

    // Lấy các thành phần của ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Định dạng thành chuỗi ISO 8601
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

    return isoString;
}