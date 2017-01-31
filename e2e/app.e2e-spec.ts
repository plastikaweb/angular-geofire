import { AngularGeofirePage } from './app.po';

describe('angular-geofire App', function() {
  let page: AngularGeofirePage;

  beforeEach(() => {
    page = new AngularGeofirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
