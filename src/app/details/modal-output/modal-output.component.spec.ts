import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOutputComponent } from './modal-output.component';

describe('ModalOutputComponent', () => {
  let component: ModalOutputComponent;
  let fixture: ComponentFixture<ModalOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
