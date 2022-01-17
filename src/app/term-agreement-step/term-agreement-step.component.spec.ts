import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TermAgreementStepComponent } from './term-agreement-step.component';

describe('TermAgreementStepComponent', () => {
  let component: TermAgreementStepComponent;
  let fixture: ComponentFixture<TermAgreementStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermAgreementStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermAgreementStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
