import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription2FormComponent } from './inscription2-form.component';

describe('Inscription2FormComponent', () => {
  let component: Inscription2FormComponent;
  let fixture: ComponentFixture<Inscription2FormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription2FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
