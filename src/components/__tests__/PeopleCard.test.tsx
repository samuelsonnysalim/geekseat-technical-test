import {render, screen} from '@testing-library/react-native';
import PeopleCard from '../PeopleCard';

describe('PeopleCard', () => {
  it('should load component', () => {
    render(<PeopleCard name="Luke Skywalker" />);

    expect(screen.getByText('LS')).toBeDefined();
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
  });
});
