import {render, screen} from '@testing-library/react-native';
import Initial from '../Initial';

describe('Initial', () => {
  it('should load component and show valid initials', () => {
    render(<Initial name="Luke Skywalker" />);

    expect(screen.getByText('LS')).toBeDefined();

    render(<Initial name="R2-D2" />);

    expect(screen.getByText('RD')).toBeDefined();

    render(<Initial name="Obi-Wan Kenobi" />);

    expect(screen.getByText('OWK')).toBeDefined();
  });
});
