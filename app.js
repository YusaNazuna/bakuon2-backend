import * as router from 'aws-lambda-router';
import { routes } from './src/routes/router';

export const handler = router.handler({
  proxyIntegration: {
    cors: true,
    routes
  }
});
