import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { Observable, firstValueFrom, of } from "rxjs";
import { Storage } from "@ionic/storage-angular";
import { UserResult } from "../interfaces/user-profile";
import { UserService } from "./user.service";

const STORAGE_KEY = "mylist";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _storage: Storage | null = null;
  private usersData$: Observable<UserResult[]> = of<UserResult[]>([]);

  constructor(private storage: Storage) {}

  getData() {
    console.log("GET DATA");
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item: any) {
    const storedData = (await this.storage.get(STORAGE_KEY)) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeData(index: number) {
    const storedData: any[] = (await this.storage.get(STORAGE_KEY)) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }
}
