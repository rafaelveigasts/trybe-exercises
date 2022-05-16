  // src/index.ts
  import FrameController from './Controllers/Frame';
  import LensController from './Controllers/Lens';
  import Frame from './Interfaces/Frame';
  import Lens from './Interfaces/Lens';
  import CustomRouter from './Routes/Router';
  import App from './server';

  const server = new App();

  const lensController = new LensController();
  const frameController = new FrameController();

  const lensRouter = new CustomRouter<Lens>();
  lensRouter.addRoute(lensController);

  const frameRouter = new CustomRouter<Frame>();
  frameRouter.addRoute(frameController);

  server.addRouter(lensRouter.router);
  server.addRouter(frameRouter.router);

  server.startServer();