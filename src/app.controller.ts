import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* The routing mechanism cantrols which controller receives the request */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
