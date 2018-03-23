import { Injectable } from "@angular/core";
declare let alertify: any;
@Injectable()
export class AlertifyService {
  constructor() {}
  error(message: string) {
    alertify.error(message);
  }
  success(message: string) {
    alertify.success(message);
  }
  notify(message: string) {
    alertify.message(message);
  }

  confirm(message: string, title: string, okCallback) {
    alertify.confirm(
      title,
      message,
      () => {
        okCallback();
      },
      () => {}
    );
  }
}
