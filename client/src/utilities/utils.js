export const getOneMonthAgoReleaseDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const formattedDate = date.toJSON().slice(0, 10);

  return formattedDate;
};

export const dateToYearOnly = (date) => date.slice(0, 4);

export const capitalizeFirstLetter = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const capitalizeEveryFirstLetter = (text = '') => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const randomize = (data = {}) =>
  Math.floor(Math.random() * data.length - 1);

export const truncate = (text, n) =>
  text?.length > n ? `${text.substr(0, n - 1)}...` : text;
