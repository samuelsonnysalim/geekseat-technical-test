import {render, screen} from '@testing-library/react-native';
import LabelMultipleValues from '../LabelMultipleValues';

describe('LabelMultipleValues', () => {
  it('should load component', () => {
    render(
      <LabelMultipleValues
        label="Films"
        values={[
          {
            title: 'Title 1',
            description: 'Desc 1',
          },
          {
            title: 'Title 2',
            description: 'Desc 2',
          },
        ]}
      />,
    );

    expect(screen.getByText('Films')).toBeDefined();
    expect(screen.getByText('• Title 1')).toBeDefined();
    expect(screen.getByText('Desc 1')).toBeDefined();
    expect(screen.getByText('• Title 2')).toBeDefined();
    expect(screen.getByText('Desc 2')).toBeDefined();
  });
});
