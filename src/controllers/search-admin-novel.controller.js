import { doCorrelationCheck } from '../services/request-check/correlation-check.service';
import { Errors, responseError } from '../services/error/error-handling.service';
import { SearchAdminNovelService } from '../services/api/search-admin-novel.service';

export const SearchAdminNovelController = async (request, context) => {
  const apiCode = 'B001';
  try {
    const corCheckResult = await doCorrelationCheck(request);
    // 相関チェック
    if (corCheckResult.isValid) {
      return responseError(apiCode, Errors.RequestNotAllowed.name, null);
    }
    const userId = corCheckResult.data[0]['user_id'];
    return await SearchAdminNovelService(userId);
  } catch (e) {
    return responseError(apiCode, Errors.Exception.name, null);
  }
};
