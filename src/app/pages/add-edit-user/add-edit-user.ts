import {
  map,
  filter,
  takeUntil,
  tap,
  switchMap,
  exhaustMap,
} from "rxjs/operators";
import {
  Observable,
  of,
  pipe,
  Subject,
  firstValueFrom,
  lastValueFrom,
  Subscription,
} from "rxjs";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import { CustomUserResult, UserResult } from "../../interfaces/user-profile";
import { UserDataStorageService } from "../../services/userStorage.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: "add-edit-user",
  templateUrl: "add-edit-user.html",
  styleUrls: ["./add-edit-user.scss"],
})
export class AddEditUserPage implements OnInit, OnDestroy {
  private destroyed$ = new Subject<any>();
  private subcription = new Subscription();

  isLoadingPage = false;
  isUserId = false;
  userId: number;
  // loaded user data
  getUserDataById$: Observable<UserResult> = of();
  getUsersDataFromStorage$: Observable<UserResult[]>;
  setUsersDataToStorage$: Observable<UserResult[]>;
  userDataById: UserResult;
  //form controls
  userDataForm: FormGroup;
  validations: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataStorageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private alertService: AlertService
  ) {}

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    // this.subcription.unsubscribe();
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  ngOnInit() {
    const _userId = this.route.snapshot.paramMap.get("userId");

    this.isUserId = _userId !== null;
    this.userId = this.isUserId ? Number(_userId) : null;

    this.isUserId ? this.loadUserData(this.userId) : null;

    this.initializeForm();
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.getUserDataById$;
      });
  }

  loadUserData(userId: number) {
    this.getUserDataById$ = this.userDataService.getUserById(userId);
    this.patchUserData();
  }

  initializeForm() {
    this.userDataForm = this.formBuilder.group({
      userId: this.userId,
      name: ["", Validators.required],
      email: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required],
      gender: ["", Validators.required],
      picture: ["", Validators.required],
      description: "",
    });

    this.validations = {
      name: [
        {
          type: "required",
          message: this.translate.instant("user_name_missed_error"),
        },
      ],
      email: [
        {
          type: "required",
          message: this.translate.instant("user_email_missed_error"),
        },
      ],
      city: [
        {
          type: "required",
          message: this.translate.instant("user_city_missed_error"),
        },
      ],
      country: [
        {
          type: "required",
          message: this.translate.instant("user_country_missed_error"),
        },
      ],
      phone: [
        {
          type: "required",
          message: this.translate.instant("user_phone_missed_error"),
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

  patchUserData() {
    return this.getUserDataById$
      .pipe(
        map((d: CustomUserResult) => {
          let { picture, location, ...restData } = d;
          const dataObject = {
            ...restData,
            picture: picture?.large || "",
            city: location.city || "",
            country: location.country || "",
          };
          console.log(dataObject);
          return dataObject;
        }),

        tap((userData) => this.userDataForm.patchValue(userData)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  async onSave() {
    const formData = this.userDataForm.getRawValue();
    const formError = this.userDataForm.errors;
    const isValidationForm = this.userDataForm.valid;

    if (formError === null && isValidationForm) {
      const {
        city,
        country,
        description,
        email,
        gender,
        name,
        phone,
        picture,
      } = formData;

      if (this.isUserId) {
        this.userDataService
          .getUsersData()
          .pipe(
            map((usersData: UserResult[]) =>
              usersData.map((userData, index) =>
                index === this.userId
                  ? (userData = {
                      ...userData,
                      location: {
                        city: city,
                        country: country,
                      },
                      description: description,
                      email: email,
                      gender: gender,
                      name: name,
                      phone: phone,
                      picture: { large: picture },
                    })
                  : userData
              )
            ),
            exhaustMap((usersData: UserResult[]) =>
              this.userDataService
                .setUsersData(usersData)
                .pipe(
                  tap(() =>
                    console.log(
                      "changed user data successfully saved on storage!"
                    )
                  )
                )
            ),
            takeUntil(this.destroyed$)
          )
          .subscribe();
        const isConfirmTrue = await this.openConfirmBackToUserCardsAlert();
        if (isConfirmTrue) {
          this.router.navigateByUrl("/app/tabs/users");
        }
      } else {
        console.log("on add user");
        //TODO; implement to add new user!
        /*
        this.userDataService
        .getUsersData()
        .pipe(
          switchMap((userData) => {
            const addedUserId = userData.length + 1;
            formData.id = addedUserId;
            userData.push(formData);
            return this.userDataService.setUsersData(userData)
          })
        )
      */
      }
    }

    console.log(formData);
  }

  async openConfirmBackToUserCardsAlert() {
    const header = this.translate.instant("back_to_the_users_cards");
    const message = this.translate.instant("sure_want_back_to_users_cards");
    const confirm = await this.alertService.confirmationPopup(header, message);
    return confirm ? true : false;
  }
}
