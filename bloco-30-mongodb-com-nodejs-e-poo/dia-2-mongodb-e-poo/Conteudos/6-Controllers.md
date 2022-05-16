## Controllers

Agora que temos nossa camada Service implementada, partiremos para construção da nossa camada Controller. Essa, por sua vez, será responsável por lidar com nossas requests e responses . Para construirmos nossa API, precisaremos de dois controllers, um para lidar com as requisições para a collection Lens e outro para a Frame .

## Classe Controller



  // src/Controllers/index.ts

  import { Request, Response } from 'express';
  import Service from '../Services';

  export type ResponseError = {
    error: unknown;
  };

  export interface RequestWithBody<T> extends Request {
    body: T;
  }

  enum ControllerErrors {
    internal = 'Internal Server Error',
    notFound = 'Object not found',
    requiredId = 'Id is required',
    badRequest = 'Bad request',
  }

  abstract class Controller<T> {
    abstract route: string;

    protected errors = ControllerErrors;

    constructor(protected service: Service<T>) { }

    abstract create(
      req: RequestWithBody<T>,
      res: Response<T | ResponseError>,
    ): Promise<typeof res>;

    read = async (
      _req: Request,
      res: Response<T[] | ResponseError>,
    ): Promise<typeof res> => {
      try {
        const objs = await this.service.read();
        return res.json(objs);
      } catch (err) {
        return res.status(500).json({ error: this.errors.internal });
      }
    };

    abstract readOne(
      req: Request<{ id: string; }>,
      res: Response<T | ResponseError>
    ): Promise<typeof res>;
  }
  export default Controller;


Primeiramente criamos alguns auxiliares, que são o tipo ResponseError , a interface RequestWithBody e o enum ControllerErrors . Eles não são estritamente necessários, mas ajudam a manter o código mais limpo e legível.

Nosso controller em si é uma classe abstrata, e possui os métodos create , read e readOne . O read , por ser bem simples, já vem implementado. Já os outros dois precisam ser implementados nas subclasses.

É interessante observar tanto o tipo de retorno da Response , quanto o tipo de retorno dos métodos Promise<typeof res> . Este último é uma forma de escrever que evita termos duplicação de código, bastando dizer o tipo da Response apenas uma vez.



## Controllers

Com a nossa classe Controller pronta, partiremos para a construção de um controller para lidar com as requisições para a collection Frame . A classe FrameController herda da classe Controller , recebendo o já implementado método read , e implementando os métodos create e readOne .

É importante reiterar que é na camada Controller que selecionamos o formato da resposta e os códigos de estado do HTTP. Essas respostas e códigos vão depender de como as operações irão se comportar nas camadas superiores. Por exemplo, no caso de um erro retornado pelo service, o retorno deve ser o código 400 ( bad request ) acompanhado de o que foi que o cliente fez de errado. Já no caso de qualquer erro desconhecido, o correto é retornar o código 500 ( internal server error ) e, por questões de segurança, nesse caso não é interessante retornar toda a stack do erro, mas só uma string genérica de erro interno.

  // src/Controllers/Frame.ts

  import { Request, Response } from 'express';
  import Controller, { RequestWithBody, ResponseError } from '.';
  import FrameService from '../Services/Frame';
  import Frame from '../Interfaces/Frame';

  class FrameController extends Controller<Frame> {
    private _route: string;

    constructor(
      service = new FrameService(),
      route = '/frames',
    ) {
      super(service);
      this._route = route;
    }

    get route() { return this._route; }

    create = async (
      req: RequestWithBody<Frame>,
      res: Response<Frame | ResponseError>,
    ): Promise<typeof res> => {
      const { body } = req;
      try {
        const frame = await this.service.create(body);
        if (!frame) {
          return res.status(500).json({ error: this.errors.internal });
        }
        if ('error' in frame) {
          return res.status(400).json(frame);
        }
        return res.status(201).json(frame);
      } catch (err) {
        return res.status(500).json({ error: this.errors.internal });
      }
    };

    readOne = async (
      req: Request<{ id: string }>,
      res: Response<Frame | ResponseError>,
    ): Promise<typeof res> => {
      const { id } = req.params;
      try {
        const frame = await this.service.readOne(id);
        return frame
          ? res.json(frame)
          : res.status(404).json({ error: this.errors.notFound });
      } catch (error) {
        return res.status(500).json({ error: this.errors.internal });
      }
    };
  }

  export default FrameController;


  A classe LensController é praticamente igual, só muda tipagem:



  // src/Controllers/Lens.ts

  import { Request, Response } from 'express';
  import Controller, { RequestWithBody, ResponseError } from '.';
  import LensService from '../Services/Lens';
  import Lens from '../Interfaces/Lens';

  class LensController extends Controller<Lens> {
    private _route: string;

    constructor(
      service = new LensService(),
      route = '/lenses',
    ) {
      super(service);
      this._route = route;
    }

    get route() { return this._route; }

    create = async (
      req: RequestWithBody<Lens>,
      res: Response<Lens | ResponseError>,
    ): Promise<typeof res> => {
      const { body } = req;
      try {
        const lens = await this.service.create(body);
        if (!lens) {
          return res.status(500).json({ error: this.errors.internal });
        }
        if ('error' in lens) {
          return res.status(400).json(lens);
        }
        return res.status(201).json(lens);
      } catch (err) {
        return res.status(500).json({ error: this.errors.internal });
      }
    };

    readOne = async (
      req: Request<{ id: string; }>,
      res: Response<Lens | ResponseError>,
    ): Promise<typeof res> => {
      const { id } = req.params;
      try {
        const lens = await this.service.readOne(id);
        return lens
          ? res.json(lens)
          : res.status(404).json({ error: this.errors.notFound });
      } catch (error) {
        return res.status(500).json({ error: this.errors.internal });
      }
    };
  }

  export default LensController;


## Para fixar
Neste momento, você já viu como construir todas as camadas de uma API REST com Mongoose . Consegue destacar quais as principais diferenças entre o código desenvolvido hoje e a forma como você costumava desenvolver suas APIs?
