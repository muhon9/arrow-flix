const languages = require('../data/languages');

const generateCategory = (tmdbLanguage) => {
  const categoryData = languages.find(
    (language) => language.iso_639_1 === tmdbLanguage
  );
  if (categoryData) {
    return categoryData.english_name;
  }

  return 'uncategorized';
};

module.exports = generateCategory;
