import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BultinEtudiantComponent } from './bultin-etudiant.component';

describe('BultinEtudiantComponent', () => {
  let component: BultinEtudiantComponent;
  let fixture: ComponentFixture<BultinEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BultinEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BultinEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
