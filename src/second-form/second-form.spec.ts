import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondForm } from './second-form';

describe('SecondForm', () => {
  let component: SecondForm;
  let fixture: ComponentFixture<SecondForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
