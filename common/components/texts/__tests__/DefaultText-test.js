import renderer from 'react-test-renderer';

it(`renders correctly`, () => {
  const tree = renderer.create(<DefaultText>Snapshot test!</DefaultText>).toJSON();

  expect(tree).toMatchSnapshot();
});
