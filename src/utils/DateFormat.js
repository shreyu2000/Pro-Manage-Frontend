// Assuming dueDate is a string in the format "YYYY-MM-DD"

export const formatDate = (dueDate) => {
  const date = new Date(dueDate);
  const month = date.toLocaleString('en-us', { month: 'short' });
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  return `${month} ${day}${suffix}`;
};

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

// Example usage:
const formattedDate = formatDate("2024-02-25");
console.log(formattedDate); // Output: Feb 25th
