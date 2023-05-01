import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  loading: any;

  constructor(public loadingCtrl: LoadingController) {}

  async showLoading(message?: string) {
    let options = message ? { message: message } : {};
    if (this.loading) return;
    this.loading = this.loadingCtrl.create(options);

    (await this.loading).present();

    /* setTimeout(async () => {
      (await loading).dismiss();
    }, 5000);*/
  }

  async hideLoading() {
    if (this.loading) {
      (await this.loading).dismiss();
      this.loading = null;
    }
  }
}
