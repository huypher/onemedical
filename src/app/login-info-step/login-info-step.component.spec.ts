import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginInfoStepComponent } from './login-info-step.component';

describe('LoginInfoStepComponent', () => {
  let component: LoginInfoStepComponent;
  let fixture: ComponentFixture<LoginInfoStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInfoStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
