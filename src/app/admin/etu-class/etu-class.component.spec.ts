import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtuClassComponent } from './etu-class.component';

describe('EtuClassComponent', () => {
  let component: EtuClassComponent;
  let fixture: ComponentFixture<EtuClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtuClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtuClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
