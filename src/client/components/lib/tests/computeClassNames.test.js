import _ from 'lodash';
import computeClassNames from '../computeClassNames';
describe('computeClassNames', () => {
  it('accepts Set as value', () => {
    const classNames = computeClassNames(new Set());

    expect(_.isArray(classNames)).toBe(true);
    expect(classNames).toHaveLength(0);
  });

  it('combines classNames', () => {
    const map = new Set([
      { props: { className: 'foo' } },
      { props: { className: 'bar' } },
    ]);

    expect(computeClassNames(map)).toContain('foo', 'bar');
  });

  it('combines only unique classNames', () => {
    const map = new Set([
      { props: { className: 'foo' } },
      { props: { className: 'bar' } },
      { props: { className: 'foo bar baz' } },
    ]);

    expect(computeClassNames(map)).toContain('foo', 'bar', 'baz');
  });

  it('omits false, undefined and null classNames', () => {
    const map = new Set([
      { props: { className: 'foo' } },
      { props: {} },
      { props: { className: false } },
      { props: { className: null } },
      { props: { className: undefined } },
      { props: { className: '0' } },
      { props: { className: 'false' } },
    ]);

    expect(computeClassNames(map)).toContain('foo', '0', 'false');
  });

  it('trims classNames', () => {
    const map = new Set([
      { props: { className: ' foo     bar ' } },
      { props: { className: '    baz qux' } },
    ]);

    expect(computeClassNames(map)).toContain('foo', 'bar', 'baz', 'qux');
  });
});
