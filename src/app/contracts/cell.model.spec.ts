import { Position } from '../contracts/position.model';
import { TestBed, async } from '@angular/core/testing';
import { Cell } from './cell.model';

describe('UniverseComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Cell
      ],
    }).compileComponents();
  }));
  
  it('should create the cell', async(() => {
    const fixture = TestBed.createComponent(Cell);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(Cell);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(Cell);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to game-of-file!');
  }));
});
