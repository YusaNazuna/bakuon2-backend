import { SearchNovelController } from '../controllers/search-novel.controller';

export const routes = [makePostRoute('/api/search/novel', SearchNovelController)];

function makePostRoute(path, action) {
  return {
    path: path,
    method: 'POST',
    action: action
  };
}
