import moment from "moment";

export const formatDate = (date) => {
  const formattedDate = moment(date);

  return formattedDate.format("HH:mm a | MMMM D");
};
