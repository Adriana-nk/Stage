import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription3FormComponent } from './inscription3-form.component';

describe('Inscription3FormComponent', () => {
  let component: Inscription3FormComponent;
  let fixture: ComponentFixture<Inscription3FormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription3FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
