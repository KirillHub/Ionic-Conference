import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

const defualtLang = "en";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  // globalization: Globalization;
  //  readonly LANGUAGE = 'SELECTED_LANGUAGE';
  selected = "";
  // public monthNames = moment.months();
  //public monthShortNames = moment.monthsShort();

  constructor(
    public translate: TranslateService //private storage: Storage
  ) {}

  setInitialAppLanguage() {
    this.translate.setDefaultLang(defualtLang);
    this.selected = defualtLang;
    /*this.storage.get(this.LANGUAGE).then(val => {
     if (val) {
       this.setLanguage(val);
     } else {
       this.getDeviceLanguage();
     }
   });*/
  }

  setLanguage(lng) {
    this.translate.use(lng);
    //   this.storage.set(this.LANGUAGE, lng);
    this.selected = lng;
    /* moment.locale(lng);
   this.monthNames = moment.months();
   this.monthShortNames = moment.monthsShort();*/
  }

  getSelectedLang() {
    return this.selected;
  }
  getSelectedLocale() {
    return this.selected + "-" + this.selected.toUpperCase();
  }

  initTranslate(language) {
    if (language) {
      const s = language.split("-");
      language = s[0];
      console.log("LANGUAGE system splitted: " + language);
    }

    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(defualtLang);
    if (language) {
      this.setLanguage(language);
    } else {
      language = defualtLang;
      // Set your language here
      this.setLanguage(defualtLang);
    }
    this.translate.use(language);
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === "object") {
      this.initTranslate(navigator.language);
    } else {
      /*  this.globalization.getPreferredLanguage()
       .then(res => {
         this.initTranslate(res.value)
       })
       .catch(e => {console.log(e);});*/
    }
  }
}
