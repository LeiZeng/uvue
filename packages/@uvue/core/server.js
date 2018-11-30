import { createApp } from './main';
import UVue from '@uvue/core';
import routeResolve from './lib/routeResolve';

/**
 * Vue start
 */
export default async ssr => {
  // Create context object
  const context = {
    ...ssr.inject,
    ssr,
    url: ssr.url,
    req: ssr.req,
    res: ssr.res,
  };

  // Call app main
  createApp(context);

  // Get some vars from context
  const { app, router } = context;

  // Send router to server side
  ssr.router = router;

  // Handle VueMeta plugin
  if (typeof app.$meta === 'function') {
    ssr.meta = app.$meta();
  }

  // Init router with current URL
  router.push(ssr.url);

  // On router ready
  return new Promise(resolve => {
    router.onReady(async () => {
      // Call beforeStart hook
      await UVue.invokeAsync('beforeStart', context);

      // Resolve current route
      await routeResolve(context);

      // Call beforeReady hook
      await UVue.invokeAsync('beforeReady', context);

      // Resolve app
      resolve(app);

      // Call ready hook
      UVue.invoke('ready', context);
    });
  });
};
