import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFMAKERComponent } from './pdfmaker.component';

describe('PDFMAKERComponent', () => {
  let component: PDFMAKERComponent;
  let fixture: ComponentFixture<PDFMAKERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDFMAKERComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDFMAKERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
