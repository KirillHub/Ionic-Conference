import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[inputFormat]",
})
export class ModeInputDirective {
  @Input("inputFormat") inputMode: string;
  constructor() {}

  @HostListener("keypress", ["$event"])
  onInput(event: any) {
    let pattern = /[0-9]$/;
    switch (this.inputMode) {
      case "currency":
      case "decimal": {
        pattern = /[0-9.]$/;
        break;
      }

      case "integer": {
        pattern = /^[-?0-9]+/;
        break;
      }
    }

    let result = pattern.test(event.key);
    return result;
  }

  @HostListener("change", ["$event"])
  onChange(event: any) {
    let pattern = /[0-9]$/;
    switch (this.inputMode) {
      case "currency": {
        event.value = Number(event.value);
        return (event.value =
          Math.round((event.value + Number.EPSILON) * 100) / 100);
        break;
      }
      case "decimal":
      case "integer": {
        return (event.value = Number(event.value));
        break;
      }
    }

    let result = pattern.test(event.key);
    return result;
  }

  @HostListener("focusOut", ["$event.target"])
  onFocus(event: any) {
    if (event.value) {
      switch (this.inputMode) {
        case "currency": {
          event.value = Number(event.value);
          return (event.value =
            Math.round((event.value + Number.EPSILON) * 100) / 100);
        }
        case "decimal":
        case "integer": {
          return (event.value = Number(event.value));
        }
      }
    }
  }
}
