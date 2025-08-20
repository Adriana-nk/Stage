import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription2FooterComponent } from './inscription2-footer.component';

describe('Inscription2FooterComponent', () => {
  let component: Inscription2FooterComponent;
  let fixture: ComponentFixture<Inscription2FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription2FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription2FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
