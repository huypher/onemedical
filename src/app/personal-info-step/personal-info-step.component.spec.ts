import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInfoStepComponent } from './personal-info-step.component';

describe('PersonalInfoStepComponent', () => {
  let component: PersonalInfoStepComponent;
  let fixture: ComponentFixture<PersonalInfoStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInfoStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
