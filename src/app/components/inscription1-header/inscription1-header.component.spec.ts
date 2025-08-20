import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription1HeaderComponent } from './inscription1-header.component';

describe('Inscription1HeaderComponent', () => {
  let component: Inscription1HeaderComponent;
  let fixture: ComponentFixture<Inscription1HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription1HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription1HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
