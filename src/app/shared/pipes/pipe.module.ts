import { NgModule } from "@angular/core";
import { RandomColorPipe } from "./colorRandomizer.pipe";
import { FilterPipe } from "./filter.pipe";

@NgModule({
  declarations: [FilterPipe, RandomColorPipe],
  exports: [FilterPipe, RandomColorPipe],
})
export class PipeModule {}
