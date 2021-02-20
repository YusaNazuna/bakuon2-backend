import { HelloController } from '../controllers/hello.controller';

export const routes = [makePostRoute('/api/hello', HelloController)];

function makePostRoute(path, action) {
  return {
    path: path,
    method: 'POST',
    action: action
  };
}
