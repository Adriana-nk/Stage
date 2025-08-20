import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Inscription1FooterComponent } from './inscription1-footer.component';

describe('Inscription1FooterComponent', () => {
  let component: Inscription1FooterComponent;
  let fixture: ComponentFixture<Inscription1FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Inscription1FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription1FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
