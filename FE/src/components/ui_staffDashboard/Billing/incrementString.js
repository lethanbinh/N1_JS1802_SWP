const incrementString = (string) => {
  // Convert passed argument to string
  const str = string.toString();

  // Extract numeric part of the string
  let numberPart = str.match(/\d+/); // Find the first sequence of digits
  let prefix = str.replace(/\d+/, ''); // Extract non-numeric prefix

  if (!numberPart) {
    // If there's no number part, start with 1
    numberPart = '1';
  } else {
    // Increment the numeric part by converting to number and back to string
    numberPart = (parseInt(numberPart[0]) + 1).toString();
  }

  // Pad the number with leading zeros if necessary
  const paddedNumber = numberPart.padStart(str.length - prefix.length, '0');

  // Concatenate prefix and padded number
  return prefix + paddedNumber;
};

export default incrementString;
