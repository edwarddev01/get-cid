import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCidComponent } from './get-cid.component';

describe('GetCidComponent', () => {
  let component: GetCidComponent;
  let fixture: ComponentFixture<GetCidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
