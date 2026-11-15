// Real libraries used by the differential tests and by scripts/results.mjs.
// Each entry: file inside the package, extra bla flags, modes to run, and a function returning observable results.
export const MODES = {
  stealth: ['--intensity', 'stealth'],
  balanced: ['--intensity', 'balanced'],
  maximum: ['--intensity', 'maximum'],
  bankrupt: ['--intensity', 'bankrupt'],
  full: ['--intensity', 'maximum', '--self-seal', '--weave-decoys'],
};

const ALL = Object.keys(MODES);

export const LIBS = {
  'is-number': { file: 'index.js', modes: ALL, calls: (m) => [m(5), m('5'), m('x'), m(NaN), m('0x10')] },
  'escape-html': { file: 'index.js', modes: ALL, calls: (m) => [m('<a href="x">&\'</a>'), m('plain')] },
  'fast-deep-equal': { file: 'index.js', modes: ALL, calls: (m) => [m({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), m([1, 2], [1, 3]), m(NaN, NaN)] },
  bytes: { file: 'index.js', modes: ALL, calls: (m) => [m(1024), m('1MB'), m(1234567, { decimalPlaces: 1 }), m.parse('5kb')] },
  ms: { file: 'index.js', modes: ALL, calls: (m) => [m('1h'), m('2 days'), m(1500), m(60000, { long: true })] },
  camelcase: { file: 'index.js', modes: ALL, calls: (m) => [m('foo-bar'), m('--foo.bar_baz'), m(['foo', 'bar']), m('Foo_BAR', { pascalCase: true })] },
  dayjs: { file: 'dayjs.min.js', modes: ALL, calls: (m) => [m('2024-03-15T10:20:30Z').add(1, 'month').format('YYYY-MM-DD'), m('2024-01-31').endOf('month').date()] },
  // 234 KB; bla refuses it without the lane-independence override, and it is slow, so only one mode
  acorn: {
    file: 'dist/acorn.js',
    extra: ['--allow-lane-independent'],
    modes: ['maximum'],
    calls: (m) => [JSON.stringify(m.parse('var a = 1 + 2; function f(x) { return x * a }', { ecmaVersion: 2022 }))],
  },
};
