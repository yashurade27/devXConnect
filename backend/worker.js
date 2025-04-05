import app from './src/index';

export default {
  async fetch(request, env, ctx) {
    return app.fetch(request, env, ctx);
  },
};
