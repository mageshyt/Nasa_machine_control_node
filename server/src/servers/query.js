const DEFAULT_LIMIT = 50;

const DEFAULT_PAGE_NUMBER = 1;

const getPagination = (query) => {
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const skip = limit * (page - 1);
  return { limit, skip };
};
module.exports = { getPagination };
