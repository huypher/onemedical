import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInfoStepComponent } from './address-info-step.component';

describe('AddressInfoStepComponent', () => {
  let component: AddressInfoStepComponent;
  let fixture: ComponentFixture<AddressInfoStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfoStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
