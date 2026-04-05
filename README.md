<h1 align="center">Console 📟</h1>
<p align="center">
  Console stdout utility library
</p>
<p align="center">
  <a href="https://npmjs.org/package/@alessiofrittoli/console">
    <img src="https://img.shields.io/npm/v/@alessiofrittoli/console" alt="Latest version"/>
  </a>
  <a href="https://coveralls.io/github/alessiofrittoli/console">
    <img src="https://coveralls.io/repos/github/alessiofrittoli/console/badge.svg" alt="Test coverage"/>
  </a>
  <a href="https://socket.dev/npm/package/@alessiofrittoli/console/overview">
    <img src="https://socket.dev/api/badge/npm/package/@alessiofrittoli/console" alt="Socket Security score"/>
  </a>
  <a href="https://npmjs.org/package/@alessiofrittoli/console">
    <img src="https://img.shields.io/npm/dm/@alessiofrittoli/console.svg" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/console">
    <img src="https://badgen.net/bundlephobia/dependency-count/@alessiofrittoli/console" alt="Dependencies"/>
  </a>
  <a href="https://libraries.io/npm/%40alessiofrittoli%2Fconsole">
    <img src="https://img.shields.io/librariesio/release/npm/@alessiofrittoli/console" alt="Dependencies status"/>
  </a>
</p>
<p align="center">
  <a href="https://bundlephobia.com/package/@alessiofrittoli/console">
    <img src="https://badgen.net/bundlephobia/min/@alessiofrittoli/console" alt="minified"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/console">
    <img src="https://badgen.net/bundlephobia/minzip/@alessiofrittoli/console" alt="minizipped"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/console">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@alessiofrittoli/console" alt="Tree shakable"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2" alt="Fund this package"/>
  </a>
</p>

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

### Table of Contents

- [Getting started](#getting-started)
- [API Reference](#api-reference)
- [Development](#development)
  - [Install dependencies](#install-dependencies)
  - [Build the source code](#build-the-source-code)
  - [ESLint](#eslint)
  - [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `console` in your projects:

```bash
npm i @alessiofrittoli/console
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/console
```

---

### API Reference

⚠️ Docs coming soon

If you want to contribute by writing `Console` documentation, please feel free to open a Pull Request on [GitHub](https://github.com/alessiofrittoli/console).

---

### Development

#### Install dependencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build the source code

Run the following command to test and build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

- See [`package.json`](./package.json) file scripts for more info.

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
              <tr>
                <td>
                  <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                    <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                  </small>
                </td>
              </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
