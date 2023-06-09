import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "randomColor",
})
export class RandomColorPipe implements PipeTransform {
  transform(colors: string[]): string {
    return colors.length !== 0
      ? colors[Math.floor(Math.random() * colors.length)]
      : "primary";
  }
}
