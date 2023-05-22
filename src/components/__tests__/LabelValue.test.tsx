import {render, screen} from '@testing-library/react-native';
import LabelValue from '../LabelValue';

describe('LabelValue', () => {
  it('should load component', () => {
    render(<LabelValue label="Name" value="Luke Skywalker" />);

    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
  });
});
