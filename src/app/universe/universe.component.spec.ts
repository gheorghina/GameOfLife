import { TestBed, async } from '@angular/core/testing';
import { UniverseComponent } from './universe.component';
describe('UniverseComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UniverseComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UniverseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(UniverseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(UniverseComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to game-of-file!');
  }));
  it('should render initialize the universe', async(() => {
    const fixture = TestBed.createComponent(UniverseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.initialize().universe).toBeGreaterThan(0);
  }));
});
