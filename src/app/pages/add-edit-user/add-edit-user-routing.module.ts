import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditUserPage } from "./add-edit-user";

const routes: Routes = [
  {
    path: "",
    component: AddEditUserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditUserPageRoutingModule {}
