import { map, filter, takeUntil } from "rxjs/operators";
import { Observable, of, pipe, Subject } from "rxjs";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import { UserResult } from "../../interfaces/user-profile";
import { UserDataStorageService } from "../../services/userStorage.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "add-edit-user",
  templateUrl: "add-edit-user.html",
  styleUrls: ["./add-edit-user.scss"],
})
export class AddEditUserPage implements OnInit, OnDestroy {
  private destroyed = new Subject<any>();

  isLoadingPage = false;
  isUserId = false;
  userId: number;
  // loaded user data
  userDataById$: Observable<UserResult> = of();
  userDataById: UserResult;
  //form controls
  userDataForm: FormGroup;
  validations: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataStorageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {}

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  ngOnInit() {
    const _userId = this.route.snapshot.paramMap.get("userId");

    this.isUserId = _userId !== null;
    this.userId = this.isUserId ? Number(_userId) : null;

    if (this.isUserId) {
      this.loadUserData(this.userId);
    }

    this.initializeForm();
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      )
      .subscribe(() => {
        this.userDataById$;
      });
  }

  async loadUserData(userId: number) {
    this.userDataById$ = this.userDataService.getUserById(userId);
    await this.patchUserData();
  }

  initializeForm() {
    this.userDataForm = this.formBuilder.group({
      userId: null,
      name: ["", Validators.required],
      gender: ["", Validators.required],
      picture: ["", Validators.required],
      // describe: ["", Validators.minLength(10), Validators.maxLength(400)],
    });

    this.validations = {
      name: [
        {
          type: "required",
          message: this.translate.instant("user_name_missed_error"),
        },
      ],
      gender: [
        {
          type: "required",
          message: this.translate.instant("user_gender_missed_error"),
        },
      ],
      picture: [
        {
          type: "required",
          message: this.translate.instant("user_picture_missed_error"),
        },
      ],
    };
  }

  async patchUserData() {
    this.userDataById$.subscribe((userData) =>
      this.userDataForm.patchValue(userData)
    );
  }
}
