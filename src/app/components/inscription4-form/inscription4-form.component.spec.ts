import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription4FormComponent } from './inscription4-form.component';

describe('Inscription4FormComponent', () => {
  let component: Inscription4FormComponent;
  let fixture: ComponentFixture<Inscription4FormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription4FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription4FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
