# 🥖 API bun

> [!NOTE]
> A generic JSON in-memory/file-based CRUD API server for rapid prototyping, testing, workshops...
>
> Your delicious and fast Rest API ready to consume.
>
> This project was created using [_bun_](https://bun.sh) v1.1.3.

- 🥖 For rapid prototypes
- 🥖 For small pet projects
- 🥖 For educational purposes

## 1 🍳 Installation and start

```bash
# ⬇️ clone the repo
git clone https://github.com/AlbertoBasalo/api_bun.git
cd api_bun
```

### 1.1 🧑‍🍳 - If you have already _bun_ in your system

```bash
# 🥖 want to try this!
bun run start
# 🧑‍🍳 To start in dev mode:
# install the types...
bun i
# and then run-watching changes.
bun run dev
```

### 1.2 🍽️ - If not a _bun_ user, then fallback to npm

> [!TIP]
>
> _Bun_ installation is easy and highly recommended.
>
> https://bun.sh/docs/cli/install

```bash
# 🥖 want to try this:
# install local bun...
npm run bun:i
# and then start the API server with npm
npm start
```

## 2 🧂 Tasty environment configuration

Runtime configuration taken from from `.env` file, command line or defaults.

```ts
export type ApiBunConfig = {
  /** Log level (info,none,verbose) */
  LOG_LEVEL: LogLevels;
  /** Storage type (memory,file) */
  STORAGE: StorageTypes;
  /** Security type (none,write) */
  SECURITY: SecurityTypes;
  /** Secret */
  SECRET: string;
};
```

> [!TIP]
> Sample `.env` with default values
>
> Create it outside the `src` folder. It will be ignored by git.

```txt
STORAGE=memory
LOG_LEVEL=info
SECURITY=none
SECRET=secret
```

## 3 ☕ Hot Features

- [x] Publishes a generic CRUD API
- [x] Endpoint routes in the form `http://localhost:3000/{collection_name}` for GET all or POST.
- [x] Add the _id_ `http://localhost:3000/{collection_name}/{id}` for GET one, PUT or DELETE.
- [x] Add _queryParams_ `http://localhost:3000/{collection_name}?key={key}&value={value}` for GET by key/value.
- [x] Always try to feeds any resource with seed data from `db/{collection_name}.json`.
- [x] If no file found, then starts with an empty array.
- [x] Uses _id_ as a primary key to identify items.
- [x] If not supplied during POST, then generates a new random _id_.
- [x] Configuration with `.env` file or command line (see below).
- [x] If configured with `STORAGE=file`, then persist changes (POST,PUT, DELETE) to file system.
- [x] PUT works like a PATCH, only updating the fields supplied.
- [x] Logs to console with different levels (_info, none, verbose_).
- [x] Minimal security with signed token (not JWT compliant).
- [ ] _JWT Security and authorization_
- [ ] _Sorted results_
- [ ] _Pagination_
- [ ] _Put and patch distinction_
- [ ] _Allow to configure the primary key property name_
- [ ] _Allow to configure the storage path_

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
