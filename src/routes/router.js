import { SearchAdminNovelController } from '../controllers/search-admin-novel.controller';

export const routes = [makePostRoute('/api/search/admin/novel', 'GET', SearchAdminNovelController)];

function makePostRoute(path, method, action) {
  return {
    path: path,
    method: method,
    action: action
  };
}
