import { Controller, Post } from "@nestjs/common";


@Controller("doctors")
export class DoctorsController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }
  

  @Post("save-doctors-profile")
  public async saveDoctorsProfile(): Promise<any> {
    try {

    } catch (exception) {
      throw exception;
    }
  }
}