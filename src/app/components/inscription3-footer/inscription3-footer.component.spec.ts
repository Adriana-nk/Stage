import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription3FooterComponent } from './inscription3-footer.component';

describe('Inscription3FooterComponent', () => {
  let component: Inscription3FooterComponent;
  let fixture: ComponentFixture<Inscription3FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription3FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription3FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
