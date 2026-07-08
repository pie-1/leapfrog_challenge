const crypto = require('crypto');

const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const calculateAge = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
};

const isObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const sanitizeSearchQuery = (query) => {
  return query.replace(/[^\w\s]/gi, '');
};

module.exports = {
  generateRandomString,
  formatDate,
  formatDateTime,
  truncateText,
  calculateAge,
  isObjectId,
  sanitizeSearchQuery
};