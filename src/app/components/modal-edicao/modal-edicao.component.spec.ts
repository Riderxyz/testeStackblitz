import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicaoComponent } from './modal-edicao.component';

describe('ModalEdicaoComponent', () => {
  let component: ModalEdicaoComponent;
  let fixture: ComponentFixture<ModalEdicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEdicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
