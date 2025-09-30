import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstForm } from './first-form';

describe('FirstForm', () => {
  let component: FirstForm;
  let fixture: ComponentFixture<FirstForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
