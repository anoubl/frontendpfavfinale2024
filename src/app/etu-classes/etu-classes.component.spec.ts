import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtuClassesComponent } from './etu-classes.component';

describe('EtuClassesComponent', () => {
  let component: EtuClassesComponent;
  let fixture: ComponentFixture<EtuClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtuClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtuClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
