export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const statusLabelStyles = {
  New: "bg-sky-100 text-sky-700",
  Contacted: "bg-amber-100 text-amber-700",
  "Visit Scheduled": "bg-violet-100 text-violet-700",
  Converted: "bg-emerald-100 text-emerald-700",
  Lost: "bg-rose-100 text-rose-700",
};

export const statusBorderStyles = {
  New: "border-sky-200",
  Contacted: "border-amber-200",
  "Visit Scheduled": "border-violet-200",
  Converted: "border-emerald-200",
  Lost: "border-rose-200",
};
