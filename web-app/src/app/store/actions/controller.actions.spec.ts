import * as controllerActions from './controller.actions';

describe('Controller status update action', () => {
  it('should create an instance', () => {
    expect(controllerActions.LoadControllers()).toBeTruthy();
  });
});
