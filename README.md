# API bun

> [!NOTE]
> A generic JSON in-memory/file-based CRUD API server for rapid prototyping, testing, workshops...

This project was created using [_bun_](https://bun.sh) v1.1.3.

## 1 - If you have already _bun_ in your system

```bash
# Just want this thing running.
bun run start
# To start in dev mode:
# install the types...
bun i
# and then run watching changes.
bun run dev
```

## 2 - If not a _bun_ user, then fallback to npm

> [!TIP]
> Bun installation is easy and highly recommended
> https://bun.sh/docs/cli/install

```bash
# Just want this thing running:
# install local bun...
npm run bun:i
# and then start the API server with npm
npm start
```

## Features

- [x] Publishes a generic CRUD API
- [x] Endpoint routes in the form `http://localhost:3000/{collection_name}` for get all or post.
- [x] Endpoint routes in the form `http://localhost:3000/{collection_name}/{id}` for get one, put or delete.
- [x] Endpoint routes in the form `http://localhost:3000/{collection_name}?key={key}&value={value}` for get by key/value.
- [x] Feeds any resource with seed data from `db/{collection_name}.json`.
- [x] If no file found, then starts with an empty array.
- [x] Adds a random `id` to any item if not supplied during POST.
- [x] Configuration with `.env` file or command line (see below).
- [x] If `STORAGE=file` configuration, then persist changes (POST,PUT, DELETE) to file system.
- [x] PUT works like a PATCH, only updating the fields supplied.
- [x] Logs to console with different levels (info, none, verbose).
- [ ] Security and authorization

## Environment configuration

Runtime configuration taken from from `.env` file, command line or defaults.

```json
export type ApiBunConfig = {
  /** Log level (info,none,verbose) */
  LOG_LEVEL: LogLevels;
  /** Storage type (memory,file) */
  STORAGE: StorageTypes;
  // ToDo: Auth configuration
};
```

> [!NOTE]
> Sample `.env` with default values

```txt
STORAGE=memory
LOG_LEVEL=info
```

---

> [!CAUTION]
> Not suitable for production use. Use only for rapid prototyping, testing, workshops...

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
