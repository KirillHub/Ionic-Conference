import { UsersModule } from "./users.module";
import { IonicModule } from "@ionic/angular";
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { UsersPage } from "./users";
import { UserService } from "../../services/user.service";
import { Observable, of } from "rxjs";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import {} from "jasmine";

describe("UsersPage", () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let userServiceStub: Partial<UserService>;
  let compDebugElement: DebugElement;
  let testData: UserResult[] = [
    {
      email: "johndoe@example.com",
      gender: "male",
      name: "John Doe",
      phone: "345",
      picture: {
        large: "",
      },
    },
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      gender: "female",
      phone: "3333",
      picture: {
        large: "",
      },
    },
  ];

  beforeEach(waitForAsync(() => {
    userServiceStub = {
      getUsers: () => {
        return of(testData);
      },
    };

    TestBed.configureTestingModule({
      declarations: [UsersPage],
      imports: [IonicModule.forRoot(), UsersModule],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compDebugElement = fixture.debugElement;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it;
  //   it("should initialize the data", () => {
  //     expect(component.isUsersLoad).toBe(true);
  //     expect(component.data).toEqual(of(testData));
  //   });
});
