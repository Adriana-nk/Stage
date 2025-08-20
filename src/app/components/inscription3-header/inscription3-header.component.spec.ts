import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription3HeaderComponent } from './inscription3-header.component';

describe('Inscription3HeaderComponent', () => {
  let component: Inscription3HeaderComponent;
  let fixture: ComponentFixture<Inscription3HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription3HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription3HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
