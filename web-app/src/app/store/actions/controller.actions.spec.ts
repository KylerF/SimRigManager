import * as ControllerActions from './controller.actions';

describe('Controller status update action', () => {
  it('should create an instance', () => {
    expect(new ControllerActions.LoadControllers()).toBeTruthy();
  });
});
