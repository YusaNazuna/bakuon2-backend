/**
 * APIエラーハンドリング
 */
export const Errors = {
  RequestNotAllowed: { statusCode: 400, errorCode: 'E401', name: 'RequestNotAllowed', message: 'This API work is not allowed' },
  Exception: { statusCode: 500, errorCode: 'E600', name: 'Exception', message: 'This API work is failed for server error' }
};

/**
 * @param apiCode
 * @param errorName
 * @param errorMessage
 * @param params
 */
export function responseError(apiCode, errorName, errorMessage) {
  let res;
  let message = errorName ? Errors[errorName].message : null;
  const errorCode = errorName ? Errors[errorName].errorCode : null;

  switch (errorName) {
    case Errors.RequestNotAllowed.name:
      res = createResponseRequestNotAllowed(message);
      break;
    default:
      res = createResponseException(errorMessage);
      break;
  }

  createErrorLog(apiCode, errorCode, message);
  return res;
}

function createResponseRequestNotAllowed(errorMessage) {
  const errorCode = Errors.RequestNotAllowed.errorCode;
  return createErrorResponse(Errors.RequestNotAllowed.statusCode, errorCode, errorMessage);
}

function createResponseException(errorMessage) {
  const errorCode = Errors.Exception.errorCode;
  return createErrorResponse(Errors.Exception.statusCode, errorCode, errorMessage);
}

function createErrorResponse(statusCode, errorCode, errorMessage) {
  const resBody = { errorCode: null, errorMessage: null };
  resBody.errorCode = errorCode;
  resBody.errorMessage = errorMessage;
  return {
    statusCode,
    body: JSON.stringify(resBody)
  };
}

/**
 * エラーログ書き込み
 * @param apiCode 該当API
 * @param errorCode E○○○
 * @param errorMessage エラーメッセージ
 */
function createErrorLog(apiCode, errorCode, errorMessage) {
  console.error(`[${errorCode}] ${apiCode} : ${errorMessage}`);
}
