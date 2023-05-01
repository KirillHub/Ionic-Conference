import { Injectable } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  async getExpireSessionAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant("session_expired_title"),
      subHeader: this.translate.instant("session_expired_description"),
      buttons: [
        {
          text: this.translate.instant("close"),
          role: "cancel",
        },
      ],
    });
    return alert;
  }

  async confirmationPopup(header?, message?): Promise<boolean> {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: header ? header : "header",
        message: message ? message : "message",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: "OK",
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async getConnectionErrorAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant("generic_error_header"),
      subHeader: this.translate.instant("generic_error_subheader"),
      buttons: [
        {
          text: this.translate.instant("close"),
          role: "cancel",
        },
      ],
    });
    return alert;
  }

  async getCustomAlert(header, message, buttons, inputs) {
    const alert = await this.alertController.create({
      header,
      message: message,
      buttons: buttons ? buttons : [],
      inputs: inputs ? inputs : [],
      backdropDismiss: false,
    });
    return alert;
  }

  async changedNotSaved(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: this.translate.instant("attention"),
        message: this.translate.instant("confirm_exit_without_save_message"),
        cssClass: "medium-alert",
        buttons: [
          {
            text: this.translate.instant("no"),
            role: "cancel",
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: this.translate.instant("continue_discard_changes"),
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async formValidationError(header?, message?): Promise<boolean> {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: header ? header : this.translate.instant("attention"),
        message: message
          ? message
          : this.translate.instant("form_validation_error_message"),
        buttons: [
          {
            text: "OK",
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }
}
