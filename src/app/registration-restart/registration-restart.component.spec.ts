import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationRestartComponent } from './registration-restart.component';

describe('RegistrationRestartComponent', () => {
  let component: RegistrationRestartComponent;
  let fixture: ComponentFixture<RegistrationRestartComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRestartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
