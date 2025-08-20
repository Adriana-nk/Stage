import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription2HeaderComponent } from './inscription2-header.component';

describe('Inscription2HeaderComponent', () => {
  let component: Inscription2HeaderComponent;
  let fixture: ComponentFixture<Inscription2HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription2HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription2HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
