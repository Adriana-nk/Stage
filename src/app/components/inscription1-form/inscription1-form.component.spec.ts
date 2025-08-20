import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription1FormComponent } from './inscription1-form.component';

describe('Inscription1FormComponent', () => {
  let component: Inscription1FormComponent;
  let fixture: ComponentFixture<Inscription1FormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription1FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
