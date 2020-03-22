module.exports = {
  throwException(errorId, errorTable) {
    const exception = _isValidTable(errorTable)
      ? _getException(errorId, errorTable)
      : { code: 405, message: "Invalid exception table" };
    return _validateException(errorId, exception);
  }
};

_getException = (errorId, errorTable) =>
  errorTable.find(error => error.id === errorId);

_validateException = (errorId, exception) =>
  exception
    ? exception
    : { code: 404, message: `Error id (${errorId}) not found` };

_isValidTable = errorTable => Array.isArray(errorTable);
