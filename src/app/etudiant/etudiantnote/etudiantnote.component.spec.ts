import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantnoteComponent } from './etudiantnote.component';

describe('EtudiantnoteComponent', () => {
  let component: EtudiantnoteComponent;
  let fixture: ComponentFixture<EtudiantnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantnoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
