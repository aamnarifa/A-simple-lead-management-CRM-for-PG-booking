export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const statusLabelStyles = {
  New: "bg-blue-100 text-blue-700 border-blue-200",
  Contacted: "bg-orange-100 text-orange-700 border-orange-200",
  "Visit Scheduled": "bg-purple-100 text-purple-700 border-purple-200",
  Converted: "bg-green-100 text-green-700 border-green-200",
  Lost: "bg-red-100 text-red-700 border-red-200",
};

export const statusBorderStyles = {
  New: "border-blue-200",
  Contacted: "border-orange-200",
  "Visit Scheduled": "border-purple-200",
  Converted: "border-green-200",
  Lost: "border-red-200",
};

export const statusDotStyles = {
  New: "bg-blue-500",
  Contacted: "bg-orange-500",
  "Visit Scheduled": "bg-purple-500",
  Converted: "bg-green-500",
  Lost: "bg-red-500",
};

export const statusColors = {
  New: "blue",
  Contacted: "orange",
  "Visit Scheduled": "purple",
  Converted: "green",
  Lost: "red",
};
