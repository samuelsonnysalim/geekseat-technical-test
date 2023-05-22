import {render, screen, fireEvent} from '@testing-library/react-native';
import PeopleCard from '../PeopleCard';

jest.useFakeTimers();

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('PeopleCard', () => {
  it('should load component', () => {
    render(<PeopleCard name="Luke Skywalker" />);

    expect(screen.getByText('LS')).toBeDefined();
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
  });

  it('should navigate on press to detail page', () => {
    render(<PeopleCard id="1" name="Luke Skywalker" />);

    fireEvent.press(screen.getByText('Luke Skywalker'));
    expect(mockedNavigate).toBeCalledWith('Detail', {
      id: '1',
      name: 'Luke Skywalker',
    });
  });
});
